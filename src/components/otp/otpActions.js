"use server";
import { cookies } from "next/headers";

export const handleEmailConfirm = async (data) => {
  const cookie = await cookies();
  const user = JSON.parse(cookie.get("user").value);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/verify-otp`,
      {
        method: "POST",
        body: JSON.stringify({ email: user.email, ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const final = await res.json();

    // Check the actual response content, not just HTTP status
    if (final.status === "success") {
      // Return a success object
      return { success: true, data: final };
    } else {
      // Return an error object
      return {
        success: false,
        error: final.message || "Verification failed",
      };
    }
  } catch (err) {
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." };
  }
};

export const handleRequestOtp = async (data) => {
  const cookie = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/request-otp`,
      {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const final = await res.json();

    // Check the actual response content, not just HTTP status
    if (final.status === "success") {
      // Return a success object
      return { success: true, data: final };
    } else {
      // Return an error object
      return {
        success: false,
        error: final.message || "Verification failed",
      };
    }
  } catch (err) {
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." };
  }
};