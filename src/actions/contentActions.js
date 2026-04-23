"use server";

import { cookies } from "next/headers";

export async function getAllContents(query = "") {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
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
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}
// انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة اخرى

export async function getContentById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
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
  } catch (err) {
    console.log(err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function createContent(data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
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
  } catch (err) {
    console.log(err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function updateContent(id, data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
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
  } catch (err) {
      console.log(err);
    return { success: false, error: "An unexpected error occurred." };
  }
}