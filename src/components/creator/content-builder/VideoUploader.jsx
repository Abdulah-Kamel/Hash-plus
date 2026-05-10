"use client";
import React, { useRef, useCallback } from "react";
import { Upload, X, Film, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMultipartUpload } from "@/hooks/useMultipartUpload";
import { toast } from "sonner";

const STATUS_CONFIG = {
  idle:       { color: "bg-gray-100",     text: "" },
  starting:   { color: "bg-blue-500",     text: "جاري التحضير..." },
  uploading:  { color: "bg-primary",      text: "جاري الرفع..." },
  completing: { color: "bg-primary",      text: "جاري الإنهاء..." },
  done:       { color: "bg-green-500",    text: "تم الرفع بنجاح" },
  error:      { color: "bg-red-500",      text: "فشل الرفع" },
  cancelled:  { color: "bg-amber-500",    text: "تم الإلغاء" },
};

const formatSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

/**
 * VideoUploader — drag & drop / click to select video, uploads via multipart with progress.
 *
 * Props:
 *   onUploadComplete(result)  — called with { key, uploadId, url, ... } on success
 *   maxSizeMB                — max file size in MB (default 2048 = 2GB)
 *   accept                   — accepted file types (default "video/*")
 *   label                    — upload area label
 */

const VideoUploader = ({
  onUploadComplete,
  maxSizeMB = 2048,
  accept = "video/*",
  label = "اسحب الفيديو هنا أو اضغط للاختيار",
}) => {
  const fileInputRef = useRef(null);
  const {
    uploadFile,
    cancelUpload,
    resetState,
    progress,
    status,
    error,
    result,
  } = useMultipartUpload();

  const isActive = ["starting", "uploading", "completing"].includes(status);
  const isDone = status === "done";
  const isError = status === "error";

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;

      // Validate type
      if (accept === "video/*" && !file.type.startsWith("video/")) {
        toast.error("يرجى اختيار ملف فيديو صالح");
        return;
      }

      // Validate size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`حجم الملف يتجاوز ${maxSizeMB >= 1024 ? `${(maxSizeMB / 1024).toFixed(0)} GB` : `${maxSizeMB} MB`}`);
        return;
      }

      const uploadResult = await uploadFile(file);
      if (uploadResult) {
        toast.success("تم رفع الفيديو بنجاح");
        onUploadComplete?.(uploadResult);
      }
    },
    [uploadFile, onUploadComplete, maxSizeMB, accept]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (isActive) return;
      const file = e.dataTransfer?.files?.[0];
      handleFile(file);
    },
    [handleFile, isActive]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div className="space-y-3">
      {/* Upload area — hidden during active upload */}
      {!isActive && !isDone && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isError
              ? "border-red-300 bg-red-50/30 hover:border-red-400"
              : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${isError ? "text-red-400" : "text-gray-400"}`} />
          <p className={`text-sm font-medium ${isError ? "text-red-500" : "text-primary"}`}>
            {label}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            MP4, MOV, AVI, MKV (حد أقصى {maxSizeMB >= 1024 ? `${(maxSizeMB / 1024).toFixed(0)} GB` : `${maxSizeMB} MB`})
          </p>
          {isError && error && (
            <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}
        </div>
      )}

      {/* Progress UI — shown during upload */}
      {isActive && (
        <div className="border border-gray-200 rounded-xl p-5 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{config.text}</p>
                <p className="text-xs text-gray-400">{progress}%</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancelUpload}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <X className="w-4 h-4 ml-1" />
              إلغاء
            </Button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${config.color}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Done state */}
      {isDone && (
        <div className="border border-green-200 bg-green-50/30 rounded-xl p-4 flex items-center justify-between" dir="rtl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-700">تم رفع الفيديو بنجاح</p>
              {result?.key && (
                <p className="text-xs text-green-500 mt-0.5 truncate max-w-[250px]">
                  {result.key}
                </p>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              resetState();
            }}
            className="text-gray-500 cursor-pointer"
          >
            رفع آخر
          </Button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default VideoUploader;
