"use server";
import { cookies } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_BASE_API;

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("user-token")?.value;
}

async function getUserId() {
  const cookieStore = await cookies();
  const userStr = cookieStore.get("user")?.value;
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user._id || user.id || null;
  } catch {
    return null;
  }
}

/**
 * Start a multipart upload.
 * Returns: { key, uploadId, urls: [presignedUrl1, presignedUrl2, ...] }
 */
export async function startMultipartUpload({ fileName, fileType, partsCount }) {
  const token = await getToken();
  const userId = await getUserId();
  console.log("upload userId:", userId);
  if (!token) return { success: false, error: "غير مصرح" };
  if (!userId) return { success: false, error: "لم يتم العثور على المستخدم" };

  const body = { fileName, fileType, userId, partsCount };
  console.log("upload start body:", body);

  try {
    const res = await fetch(`${BASE}/api/v1/uploads/multipart/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) return { success: false, error: data.message || "فشل بدء الرفع" };
    return { success: true, data: data.data || data };
  } catch (err) {
    return { success: false, error: "حدث خطأ: " + err.message };
  }
}

/**
 * Complete a multipart upload.
 * parts: [{ PartNumber: 1, ETag: "..." }, ...]
 */
export async function completeMultipartUpload({ key, uploadId, parts }) {
  const token = await getToken();
  if (!token) return { success: false, error: "غير مصرح" };

  try {
    const res = await fetch(`${BASE}/api/v1/uploads/multipart/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ key, uploadId, parts }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) return { success: false, error: data.message || "فشل إكمال الرفع" };
    return { success: true, data: data.data || data };
  } catch (err) {
    return { success: false, error: "حدث خطأ: " + err.message };
  }
}

/**
 * Abort a multipart upload.
 */
export async function abortMultipartUpload({ key, uploadId }) {
  const token = await getToken();
  if (!token) return { success: false, error: "غير مصرح" };

  try {
    const res = await fetch(`${BASE}/api/v1/uploads/multipart/abort`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ key, uploadId }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) return { success: false, error: data.message || "فشل إلغاء الرفع" };
    return { success: true };
  } catch (err) {
    return { success: false, error: "حدث خطأ: " + err.message };
  }
}

/**
 * Delete a completed upload.
 */
export async function deleteUpload({ key, uploadId }) {
  const token = await getToken();
  if (!token) return { success: false, error: "غير مصرح" };

  try {
    const res = await fetch(`${BASE}/api/v1/uploads/multipart/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ key, uploadId }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) return { success: false, error: data.message || "فشل حذف الملف" };
    return { success: true };
  } catch (err) {
    return { success: false, error: "حدث خطأ: " + err.message };
  }
}
