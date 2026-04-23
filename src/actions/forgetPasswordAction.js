"use server"

import {cookies} from "next/headers";

export const handleForgetPassword = async (data) => {
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/forgot-password`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          },
        );

        console.log(res);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Server returned an error:", errorText);
            // Return an error object
            return {success: false, error: errorText};
        }

        const final = await res.json();
        console.log(final);
        const cookie = await cookies();
        cookie.set("user-email", data.email, {
            httpOnly: true,
            sameSite: "strict"
        })
        // Return a success object
        return {success: true, data: final};
    } catch (err) {
        console.error("An unexpected error occurred:", err);
        // Return a generic error object
        return {success: false, error: "An unexpected error occurred."};
    }
}
