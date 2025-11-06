import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const userToken = cookieStore.get("user-token")?.value;

  if (!userCookie || !userToken) {
    return NextResponse.json({ user: null, token: null }, { status: 401 });
  }

  try {
    const user = JSON.parse(userCookie);

    return NextResponse.json({ user, token: userToken }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null, token: null }, { status: 400 });
  }
}
