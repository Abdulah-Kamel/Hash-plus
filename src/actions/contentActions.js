"use server";

import { cookies } from "next/headers";


export async function getAllContents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function getContentById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function createContent(data) {
  const token = await cookies().get("user-token")?.value;
  console.log(token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
//انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة اخرى