"use server"
import { log } from "console";
import {cookies} from "next/headers";

export const handleResetPassword = async (data) => {
    try {
        const cookie = await cookies();
        const userEmail = cookie.get("user-email").value
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/reset-password`,
          {
            method: "POST",
            body: JSON.stringify({ email: userEmail, ...data }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
            const errorText = await res.text();
            console.log(errorText);
            
            console.error("Server returned an error:", errorText);
            // Return an error object
            return {success: false, error: errorText};
        }

        const final = await res.json();
        console.log("final", final);
        
        // Return a success object
        return {success: true, data: final};
    } catch (err) {
        console.log("err", err);
        // Return a generic error object
        return {success: false, error: "An unexpected error occurred." + err};
    }
}
