"use client";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/me`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  return { user, token, loading, isAuthenticated: !!user };
}
