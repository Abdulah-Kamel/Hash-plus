"use server";
import { handleActionError } from "@/lib/handleActionError";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

/**
 * Submit a quiz
 * @param {string} contentId - The course/bootcamp ID
 * @param {string} contentType - "course" or "bootcamp"
 * @param {string} sectionId - The section ID
 * @param {string} moduleId - The module ID
 * @param {Array} data - Array of { _id, question, answer }
 */
export async function submitQuiz(contentId, contentType, sectionId, moduleId, data) {
  try {
    const routeType = contentType === "bootcamp" ? "bootcamps" : "courses";
    // if there is no sectionId, maybe backend still requires it? Let's assume it does.
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/submissions/${routeType}/sections/${sectionId}/modules/${moduleId}/quiz`,
      {
        method: "POST",
        body: JSON.stringify({ data }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message || error.error };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}

/**
 * Submit a task
 * @param {string} contentId - The course/bootcamp ID
 * @param {string} contentType - "course" or "bootcamp"
 * @param {string} sectionId - The section ID
 * @param {string} moduleId - The module ID
 * @param {Object} data - { url, image: { url, key, uploadId }, description }
 */
export async function submitTask(contentId, contentType, sectionId, moduleId, data) {
  try {
    const routeType = contentType === "bootcamp" ? "bootcamps" : "courses";
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/submissions/${routeType}/sections/${sectionId}/modules/${moduleId}/task`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message || error.error };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}

/**
 * Fetch all submissions for a specific content
 */
export async function getMySubmissions(contentId, submissionType = "") {
  try {
    const query = submissionType ? `?submissionType=${submissionType}` : "";
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/submissions${query}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message || error.error };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}
