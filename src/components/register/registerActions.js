"use server"
import { cookies } from 'next/headers'

export const handleRegister = async (data) => {
    try {
        const res = await fetch(`${process.env.baseApi}/api/v1/users/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Server returned an error:", errorText);
            // Return an error object
            return { success: false, error: errorText };
        }

        const final = await res.json();
        console.log(final);
        const cookie = await cookies();
        cookie.set("user-token", final.token,{
            httpOnly:true,
            sameSite:"strict"
        })
        cookie.set("user", JSON.stringify(final.data.user),{
            httpOnly:true,
            sameSite:"strict"
        })
        // Return a success object
        return { success: true, data: final };
    } catch (err) {
        console.log(err);
        // Return a generic error object
        return { success: false, error: "An unexpected error occurred." };
    }
}
