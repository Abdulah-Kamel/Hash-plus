"use server"
import {cookies} from 'next/headers'

export const handleEmailConfirm = async (data) => {
    const cookie = await cookies();
    const user = JSON.parse(cookie.get("user").value);
    try {
      const res = await fetch(
        `${process.env.baseApi}/api/v1/users/verify-email`,
        {
          method: "POST",
          body: JSON.stringify({ email: user.email, ...data }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const final = await res.json();
      console.log("API Response:", final);
      console.log("HTTP Status:", res.status);
      console.log("res.ok:", res.ok);

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
      console.log(err);
      // Return a generic error object
      return { success: false, error: "An unexpected error occurred." };
    }
}
