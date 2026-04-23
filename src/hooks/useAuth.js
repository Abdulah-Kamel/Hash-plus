"use client";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { getSession } = await import("@/actions/authActions");
        const session = await getSession();
        if (session.success && session.user) {
          setUser(session.user);
          setToken(session.token);
          console.log(session.user);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, token, loading, isAuthenticated: !!user };
}
