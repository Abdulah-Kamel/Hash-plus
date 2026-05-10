"use server";
import { handleActionError } from "@/lib/handleActionError";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { cookies } from "next/headers";

/**
 * Get the authenticated user's profile.
 * GET /api/v1/profiles
 */
export async function getMyProfile() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles`,
      { method: "GET" }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final.data || final };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Update the authenticated user's profile.
 * PATCH /api/v1/profiles
 * Send only the fields you wish to update.
 */
export async function updateMyProfile(data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final.data || final };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Get the authenticated user's profile image URL.
 * GET /api/v1/profiles/profileImage
 * Returns { success, data: { url } } or the raw image URL.
 */
export async function getProfileImage() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles/profileImage`,
      { method: "GET" }
    );

    if (!res.ok) {
      // 404 means no image — not a real error
      if (res.status === 404) return { success: true, data: null };
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || "فشل تحميل الصورة" };
    }

    // The response may be JSON with a URL or the image itself
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const final = await res.json();
      return { success: true, data: final.data || final };
    }

    // If it returns the image directly, build the URL
    return {
      success: true,
      data: { url: `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles/profileImage` },
    };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Upload / replace the user's profile image.
 * PATCH /api/v1/profiles/profileImage
 * Expects FormData with a "profileImage" file field.
 */
export async function updateProfileImage(formData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) return { success: false, error: "غير مصرح" };

    // We use raw fetch here because fetchWithAuth sets Content-Type to JSON,
    // but we need multipart/form-data for file upload.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles/profileImage`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type — browser/Node sets it with boundary for FormData
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || "فشل رفع الصورة" };
    }

    const final = await res.json();
    return { success: true, data: final.data || final };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Remove the user's profile image.
 * DELETE /api/v1/profiles/profileImage
 */
export async function removeProfileImage() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles/profileImage`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || "فشل حذف الصورة" };
    }

    // 204 No Content or 200 OK
    if (res.status === 204) return { success: true };
    const final = await res.json().catch(() => ({}));
    return { success: true, data: final.data || final };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Change the authenticated user's password.
 * PATCH /api/v1/profiles/change-password
 */
export async function changePassword({ currentPassword, newPassword, confirmNewPassword }) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles/change-password`,
      {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();

    // If the server returns a new JWT, update the cookie
    if (final.token) {
      const cookieStore = await cookies();
      cookieStore.set("user-token", final.token, { httpOnly: true, sameSite: "strict" });
    }

    return { success: true, data: final.data || final };
  } catch (err) {
    return handleActionError(err);
  }
}

/**
 * Permanently delete the authenticated user's profile.
 * DELETE /api/v1/profiles
 */
export async function removeMyProfile() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/profiles`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || "فشل حذف الحساب" };
    }

    // Clear session cookies after deletion
    const cookieStore = await cookies();
    cookieStore.delete("user-token");
    cookieStore.delete("refresh-token");
    cookieStore.delete("user");

    return { success: true };
  } catch (err) {
    return handleActionError(err);
  }
}
