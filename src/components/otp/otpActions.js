"use server"
import {cookies} from 'next/headers'

export const handleEmailConfirm = async (data) => {
    const cookie = await cookies();
    const user = JSON.parse(cookie.get('user').value)
    console.log(user)
    console.log({email: user.email, ...data})
    try {
        const res = await fetch(`${process.env.baseApi}/api/v1/users/verify-email`, {
            method: "POST",
            body: JSON.stringify({email: user.email, ...data}),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Server returned an error:", errorText);
            // Return an error object
            return {success: false, error: errorText};
        }

        const final = await res.json();
        console.log(final);
        // Return a success object
        return {success: true, data: final};
    } catch (err) {
        console.log(err);
        // Return a generic error object
        return {success: false, error: "An unexpected error occurred."};
    }
}
