"use server";

import { cookies } from "next/headers";

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
          "Content-Type": "application/json; charset=utf-8",
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
          "Content-Type": "application/json; charset=utf-8",
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

/**
 * Create a course module
 * POST /api/v1/contents/:contentId/modules/course
 */
export async function createCourseModule(contentId, data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/course`,
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
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Update a course module
 * PATCH /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function updateCourseModule(contentId, moduleId, data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
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
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Delete a course module
 * DELETE /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function deleteCourseModule(contentId, moduleId) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
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
 * Create a bootcamp module
 * POST /api/v1/contents/:contentId/modules/bootcamp
 */
export async function createBootcampModule(contentId, data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/bootcamp`,
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
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Update a bootcamp module
 * PATCH /api/v1/contents/:contentId/modules/:moduleId/bootcamp
 */
export async function updateBootcampModule(contentId, moduleId, data) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/bootcamp`,
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
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Delete a bootcamp module
 * DELETE /api/v1/contents/:contentId/modules/:moduleId/bootcamp
 */
export async function deleteBootcampModule(contentId, moduleId) {
  const token = (await cookies()).get("user-token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/bootcamp`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
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
