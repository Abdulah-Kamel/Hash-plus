"use server";

import { cookies } from "next/headers";
import { logout } from "@/actions/logoutAction";

const decodeJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (e) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return true;
  // Convert expl (seconds) to milliseconds and add a 10 second buffer
  return payload.exp * 1000 < Date.now() + 10000;
};

export async function fetchWithAuth(url, options = {}) {
  const requireAuth = options.requireAuth !== false; // default true

  const cookieStore = await cookies();
  let token = cookieStore.get("user-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  // If there is no refresh token nor access token
  if (!token && !refreshToken) {
    if (requireAuth) {
      return logout();
    }
    return fetch(url, options); // Just run ordinary fetch
  }

  // If token is missing or expired, attempt a refresh
  if (!token || isTokenExpired(token)) {
    if (!refreshToken) {
      return logout();
    }
    
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${refreshToken}`
        },
        body: JSON.stringify({ token: refreshToken, refreshToken: refreshToken })
      });
      console.log("refreshRes", refreshRes);
      if (!refreshRes.ok) {
        console.log("refreshRes", refreshRes);
        return logout();
      }

      const finalRefresh = await refreshRes.json();
      console.log("finalRefresh", finalRefresh);
      token = finalRefresh.token || finalRefresh.data?.token;
      
      const newRefreshToken = finalRefresh.refreshToken || finalRefresh.data?.refreshToken;

      // Update cookies with the new token(s)
      if (token) {
        cookieStore.set("user-token", token, { httpOnly: true, sameSite: "strict" });
      }
      if (newRefreshToken) {
        cookieStore.set("refresh-token", newRefreshToken, { httpOnly: true, sameSite: "strict" });
      }
    } catch (e) {
      return logout();
    }
  }

  // Ensure headers exist and add Authorization.
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json; charset=utf-8");
  }

  const updatedOptions = {
    ...options,
    headers,
  };

  try {
    let res = await fetch(url, updatedOptions);
    
    // In case the backend randomly rejects it even if it was technically not expired locally
    if (res.status === 401 && refreshToken) {
      try {
        const refreshRes2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${refreshToken}`
          },
          body: JSON.stringify({ token: refreshToken, refreshToken: refreshToken })
        });

        if (!refreshRes2.ok) {
           return logout();
        }

        const finalRefresh2 = await refreshRes2.json();
        token = finalRefresh2.token || finalRefresh2.data?.token;
        const newRefreshToken2 = finalRefresh2.refreshToken || finalRefresh2.data?.refreshToken;
        
        if (token) {
          cookieStore.set("user-token", token, { httpOnly: true, sameSite: "strict" });
        }
        if (newRefreshToken2) {
          cookieStore.set("refresh-token", newRefreshToken2, { httpOnly: true, sameSite: "strict" });
        }
        
        // Retry with new token
        headers.set("Authorization", `Bearer ${token}`);
        res = await fetch(url, { ...updatedOptions, headers });
      } catch (err) {
        return logout();
      }
    }
    
    return res;
  } catch (err) {
    throw err;
  }
}
