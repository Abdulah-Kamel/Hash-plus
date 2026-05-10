"use server";
import { handleActionError } from "@/lib/handleActionError";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function addToMyLearning(contentId, contentType = "course") {
  try {
    const routeType = contentType === "bootcamp" ? "bootcamps" : "courses";
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${contentId}/enrollments/${routeType}`,
      {
        method: "POST",
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

export async function getMyLearning() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/enrollments`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}

export async function removeContentFromLearning(contentId) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/learning/${contentId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}

export async function updateContentProgress(contentId, rating) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/learning/${contentId}/progress`,
      {
        method: "PUT",
        body: JSON.stringify({ rating }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return { success: false, error: error.message };
    }

    const final = await res.json();
    return { success: true, data: final };
  } catch(err) { 
    return handleActionError(err); 
  }
}
