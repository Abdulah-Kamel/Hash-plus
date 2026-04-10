"use server";

/**
 * Get a single module by ID (course type)
 * GET /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function getCourseModule(contentId, moduleId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
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

/**
 * Get a single module by ID (bootcamp type)
 * GET /api/v1/contents/:contentId/modules/:moduleId/bootcamp
 */
export async function getBootcampModule(contentId, moduleId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/bootcamp`,
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

/**
 * Get a module by ID, automatically choosing the right endpoint based on contentType
 */
export async function getModule(contentId, moduleId, contentType) {
  if (contentType === "bootcamp") {
    return getBootcampModule(contentId, moduleId);
  }
  return getCourseModule(contentId, moduleId);
}
