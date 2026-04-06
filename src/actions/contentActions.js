"use server";

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
