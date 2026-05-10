export const handleActionError = (err) => {
  if (err?.digest && err?.digest?.startsWith("NEXT_REDIRECT")) {
    throw err;
  }
  console.error("Action error:", err);
  return { success: false, error: err?.message || "An unexpected error occurred." };
};
