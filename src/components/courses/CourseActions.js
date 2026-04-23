"use server";
export async function getAllCourses() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/courses?page=1&limit=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      // Return an error object
      return { success: false, error: error.message };
    }

    const final = await res.json();
    // Return a success object
    return { success: true, data: final };
  } catch (err) {
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/categories?page=1&limit=50`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      // Return an error object
      return { success: false, error: error.message };
    }

    const final = await res.json();

    // Return a success object
    return { success: true, data: final };
  } catch (err) {
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." };
  }
}