"use server";
import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;
    const token = cookieStore.get("user-token")?.value;

    return {
      success: true,
      user: userCookie ? JSON.parse(userCookie) : null,
      token: token || null,
    };
  } catch (error) {
    console.error("Error fetching session from cookies:", error);
    return { success: false, user: null, token: null };
  }
}
