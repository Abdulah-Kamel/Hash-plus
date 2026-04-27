"use server";
import { handleActionError } from "@/lib/handleActionError";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getAllContents(query = "") {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents${query}`,
      {
        method: "GET",
        requireAuth: false,
        cache: "no-store"
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    console.log(final);
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}
// انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة اخرى

export async function getContentById(id) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
      {
        method: "GET",
        requireAuth: false,
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    console.log(final);
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

export async function createContent(data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    console.log(final);
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

export async function updateContent(id, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      
      return { success: false, error: error.message };
    }

    const final = await res.json();
    console.log(final)
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}