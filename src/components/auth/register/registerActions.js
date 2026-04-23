"use server"
import { cookies } from 'next/headers'

export const handleRegister = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );

      if (!res.ok) {
        const error = await res.json();
        // Return an error object
        console.log("error", error);
        return { success: false, error: error };
      }

      const final = await res.json();
      console.log("final", final);
      const cookie = await cookies();
      cookie.set("user-token", final.token, {
        httpOnly: true,
        sameSite: "strict",
      });
      cookie.set("user", JSON.stringify(final.data.data), {
        httpOnly: true,
        sameSite: "strict",
      });
      cookie.set("refresh-token", final.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      });
      // Return a success object
      return { success: true, data: final };
    } catch (err) {
      // Return a generic error object
      return { success: false, error: "An unexpected error occurred. " + err };
    }
}
