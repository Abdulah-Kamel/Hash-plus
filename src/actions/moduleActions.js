"use server";
import { handleActionError } from "@/lib/handleActionError";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

/**
 * Get a single module by ID (course type)
 * GET /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function getCourseModule(contentId, moduleId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

/**
 * Get a single module by ID (bootcamp type)
 * GET /api/v1/contents/:contentId/modules/:moduleId/bootcamp
 */
export async function getBootcampModule(contentId, moduleId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/bootcamp`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
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
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/course`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

/**
 * Update a course module
 * PATCH /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function updateCourseModule(contentId, moduleId, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

/**
 * Delete a course module
 * DELETE /api/v1/contents/:contentId/modules/:moduleId/course
 */
export async function deleteCourseModule(contentId, moduleId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/modules/${moduleId}/course`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { return handleActionError(err); }
}

// ─────────────────────────────────────────────────────────────
// BOOTCAMP SECTIONS  (/bootcamps/sections)
// ─────────────────────────────────────────────────────────────

/**
 * Create a bootcamp section
 * POST /api/v1/contents/:contentId/bootcamps/sections
 */
export async function createBootcampSection(contentId, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections`,
      { method: "POST", body: JSON.stringify(data) },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

/**
 * Update a bootcamp section
 * PATCH /api/v1/contents/:contentId/bootcamps/sections/:sectionId
 */
export async function updateBootcampSection(contentId, sectionId, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}`,
      { method: "PATCH", body: JSON.stringify(data) },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

/**
 * Delete a bootcamp section
 * DELETE /api/v1/contents/:contentId/bootcamps/sections/:sectionId
 */
export async function deleteBootcampSection(contentId, sectionId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}`,
      { method: "DELETE" },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

// ─────────────────────────────────────────────────────────────
// BOOTCAMP SECTION MODULES  (/bootcamps/sections/:sectionId/modules)
// ─────────────────────────────────────────────────────────────

/**
 * Add a module to a bootcamp section
 * POST /api/v1/contents/:contentId/bootcamps/sections/:sectionId/modules
 */
export async function createBootcampSectionModule(contentId, sectionId, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}/modules`,
      { method: "POST", body: JSON.stringify(data) },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

/**
 * Update a module inside a bootcamp section
 * PATCH /api/v1/contents/:contentId/bootcamps/sections/:sectionId/modules/:moduleId
 */
export async function updateBootcampSectionModule(contentId, sectionId, moduleId, data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}/modules/${moduleId}`,
      { method: "PATCH", body: JSON.stringify(data) },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

/**
 * Delete a module inside a bootcamp section
 * DELETE /api/v1/contents/:contentId/bootcamps/sections/:sectionId/modules/:moduleId
 */
export async function deleteBootcampSectionModule(contentId, sectionId, moduleId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}/modules/${moduleId}`,
      { method: "DELETE" },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}

/**
 * Get a single module inside a bootcamp section
 * GET /api/v1/contents/:contentId/bootcamps/sections/:sectionId/modules/:moduleId
 */
export async function getBootcampSectionModule(contentId, sectionId, moduleId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/bootcamps/sections/${sectionId}/modules/${moduleId}`,
      { method: "GET" },
    );
    if (!res.ok) { const e = await res.json(); return { success: false, error: e.message }; }
    return { success: true, data: await res.json() };
  } catch(err) { return handleActionError(err); }
}
