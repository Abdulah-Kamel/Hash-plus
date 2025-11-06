import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("user-token")?.value;
  const user = cookieStore.get("user")?.value;

  if (!token || !user) return null;

  return {
    token,
    user: JSON.parse(user),
  };
}
