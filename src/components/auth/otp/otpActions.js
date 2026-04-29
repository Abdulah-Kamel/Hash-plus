"use server";
import { cookies } from "next/headers";

export const handleEmailConfirm = async (data) => {
  const cookie = await cookies();
  const userCookie = cookie.get("user")?.value;
  let user = {};
  try {
    user = userCookie ? JSON.parse(userCookie) : {};
  } catch {
    user = {};
  }
  try {
    const token = cookie.get("user-token")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/verify-otp`,
      {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    const final = await res.json();

    // Check the actual response content, not just HTTP status
    if (final.success) {
      console.log("final", final);
      cookie.set("user-token", final.token, {
        httpOnly: true,
        sameSite: "strict"
      })
      cookie.set("refresh-token", final.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      });
      // Return a success object
      return { success: true, data: final };
    } else {
      // Return an error object
      console.log("final", final);
      return {
        success: false,
        error: final.error || "Verification failed",
      };
    }
  } catch (err) {
    console.log("err", err);
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." };
  }
};

export const handleRequestOtp = async (email) => {
  const cookie = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/request-otp`,
      {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log("error", error);
      // Return an error object
      return { success: false, error: error.error };
    }

    const final = await res.json();
    console.log("final", final);
    return { success: true, data: final };
  } catch (err) {
    console.log("err", err);
    // Return a generic error object
    return { success: false, error: "An unexpected error occurred." + err };
  }
};