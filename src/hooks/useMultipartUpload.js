"use client";
import { useState, useRef, useCallback } from "react";
import {
  startMultipartUpload,
  completeMultipartUpload,
  abortMultipartUpload,
} from "@/actions/uploadActions";

const PART_SIZE = 50 * 1024 * 1024; // 50 MB per chunk

/**
 * Upload a single part via XHR to a presigned URL.
 * Returns the ETag from the response headers.
 */
function uploadPartXHR(url, blob, partNumber, onProgress, abortSignal) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(partNumber, e.loaded, e.total);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader("ETag");
        resolve({ PartNumber: partNumber, ETag: etag });
      } else {
        reject(new Error(`Part ${partNumber} failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error(`Part ${partNumber} network error`))
    );

    xhr.addEventListener("abort", () =>
      reject(new Error(`Part ${partNumber} aborted`))
    );

    // Store xhr ref so we can abort it externally
    if (abortSignal) {
      abortSignal.current = xhr;
    }

    xhr.open("PUT", url, true);
    xhr.send(blob);
  });
}

/**
 * useMultipartUpload — manages the full S3/R2 multipart upload lifecycle.
 *
 * Returns:
 *   uploadFile(file)  — starts uploading
 *   cancelUpload()    — aborts in-progress upload
 *   progress          — 0-100 overall percentage
 *   status            — "idle" | "starting" | "uploading" | "completing" | "done" | "error" | "cancelled"
 *   error             — error message if status is "error"
 *   result            — { key, uploadId, url } after successful upload
 */
export function useMultipartUpload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | starting | uploading | completing | done | error | cancelled
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Track per-part progress for accurate overall %
  const partProgressRef = useRef({});
  const uploadMetaRef = useRef(null); // { key, uploadId }
  const activeXHRsRef = useRef([]);
  const cancelledRef = useRef(false);

  const resetState = useCallback(() => {
    setProgress(0);
    setStatus("idle");
    setError(null);
    setResult(null);
    partProgressRef.current = {};
    uploadMetaRef.current = null;
    activeXHRsRef.current = [];
    cancelledRef.current = false;
  }, []);

  const uploadFile = useCallback(async (file) => {
    resetState();
    cancelledRef.current = false;

    // ── Step 1: Calculate parts ──────────────────────────────
    const totalParts = Math.ceil(file.size / PART_SIZE);

    setStatus("starting");

    // ── Step 2: Start multipart upload (server action) ───────
    const startRes = await startMultipartUpload({
      fileName: file.name,
      fileType: file.type,
      partsCount: totalParts,
    });

    if (!startRes.success) {
      setStatus("error");
      setError(startRes.error);
      return null;
    }

    const { key, uploadId, urls } = startRes.data;
    uploadMetaRef.current = { key, uploadId };

    if (!urls || urls.length < totalParts) {
      setStatus("error");
      setError("لم يتم استلام روابط رفع كافية من السيرفر");
      return null;
    }

    // ── Step 3: Upload each part via XHR ──────────────────────
    setStatus("uploading");
    const completedParts = [];
    const totalBytes = file.size;

    const updateOverallProgress = () => {
      const loaded = Object.values(partProgressRef.current).reduce(
        (sum, v) => sum + v,
        0
      );
      setProgress(Math.min(Math.round((loaded / totalBytes) * 100), 99));
    };

    try {
      for (let i = 0; i < totalParts; i++) {
        if (cancelledRef.current) throw new Error("cancelled");

        const start = i * PART_SIZE;
        const end = Math.min(start + PART_SIZE, file.size);
        const blob = file.slice(start, end);
        const partNumber = i + 1;

        const xhrRef = { current: null };
        activeXHRsRef.current.push(xhrRef);

        const partResult = await uploadPartXHR(
          urls[i],
          blob,
          partNumber,
          (pn, loaded) => {
            partProgressRef.current[pn] = loaded;
            updateOverallProgress();
          },
          xhrRef
        );

        completedParts.push(partResult);
      }
    } catch (err) {
      if (cancelledRef.current) {
        setStatus("cancelled");
        // Abort on the server too
        await abortMultipartUpload({ key, uploadId }).catch(() => {});
        return null;
      }
      setStatus("error");
      setError(err.message || "فشل رفع أحد الأجزاء");
      await abortMultipartUpload({ key, uploadId }).catch(() => {});
      return null;
    }

    // ── Step 4: Complete multipart upload ─────────────────────
    setStatus("completing");

    const completeRes = await completeMultipartUpload({
      key,
      uploadId,
      parts: completedParts,
    });

    if (!completeRes.success) {
      setStatus("error");
      setError(completeRes.error);
      return null;
    }

    setProgress(100);
    setStatus("done");

    const uploadResult = {
      key,
      uploadId,
      url: completeRes.data?.url || completeRes.data?.location || null,
      ...completeRes.data,
    };
    setResult(uploadResult);
    return uploadResult;
  }, [resetState]);

  const cancelUpload = useCallback(async () => {
    cancelledRef.current = true;
    // Abort all active XHRs
    activeXHRsRef.current.forEach((ref) => {
      if (ref.current && ref.current.readyState !== 4) {
        ref.current.abort();
      }
    });
    activeXHRsRef.current = [];

    // Abort on server
    if (uploadMetaRef.current) {
      const { key, uploadId } = uploadMetaRef.current;
      await abortMultipartUpload({ key, uploadId }).catch(() => {});
    }
    setStatus("cancelled");
  }, []);

  return {
    uploadFile,
    cancelUpload,
    resetState,
    progress,
    status,
    error,
    result,
  };
}
