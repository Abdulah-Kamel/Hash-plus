"use server";
import { cookies } from "next/headers";

/**
 * Step 1: Exchange the Google auth-code for tokens via Google's token endpoint.
 * Step 2: Send the id_token to our backend POST /api/v1/auth/google → { token: id_token }
 *
 * The client_secret stays here on the server — never exposed to the browser.
 */
export async function handleGoogleAuth(code) {
  try {
    // ── Step 1: Exchange code for id_token ──────────────────────────────────
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("Google token exchange response:", tokenData);

    if (!tokenRes.ok || !tokenData.id_token) {
      return {
        success: false,
        error: tokenData.error_description || "فشل استبدال الكود مع جوجل",
      };
    }

    const idToken = tokenData.id_token;

    // ── Step 2: Send id_token to our backend ────────────────────────────────
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/google`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ token: idToken }),
      }
    );

    const final = await res.json();
    console.log("backend google auth response:", final);

    if (!res.ok) {
      return { success: false, error: final.message || "فشل تسجيل الدخول بجوجل" };
    }

    // ── Step 3: Save tokens in httpOnly cookies ──────────────────────────────
    const cookie = await cookies();
    cookie.set("user-token", final.token, { httpOnly: true, sameSite: "strict" });
    cookie.set("refresh-token", final.refreshToken, { httpOnly: true, sameSite: "strict" });
    cookie.set("user", JSON.stringify(final.data), { httpOnly: true, sameSite: "strict" });

    return { success: true, data: final };
  } catch (err) {
    return { success: false, error: "حدث خطأ غير متوقع: " + err };
  }
}

