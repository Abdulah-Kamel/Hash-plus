"use client";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-icon.svg";
import { handleGoogleAuth } from "@/actions/googleAuthActions";

/**
 * Reusable Google sign-in button.
 *
 * Props:
 *   redirectTo  — where to push after success (default "/")
 *   label       — button text (default "تسجيل الدخول عن طريق جوجل")
 */
const GoogleAuthButton = ({
  redirectTo = "/",
  label = "تسجيل الدخول عن طريق جوجل",
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("codeResponse", codeResponse);
      setLoading(true);
      try {
        const result = await handleGoogleAuth(codeResponse.code);
        if (result.success) {
          toast.success("تم تسجيل الدخول بنجاح", {
            position: "top-right",
            duration: 3000,
          });
          router.push(redirectTo);
        } else {
          toast.error(result.error || "فشل تسجيل الدخول بجوجل", {
            position: "top-right",
            duration: 4000,
          });
        }
      } catch {
        toast.error("حدث خطأ أثناء تسجيل الدخول بجوجل", {
          position: "top-right",
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("فشل فتح نافذة جوجل", { position: "top-right" });
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => login()}
      disabled={loading}
      className="w-full cursor-pointer px-5 py-2 sm:py-6 rounded-lg mt-2 max-sm:text-xs"
    >
      {loading ? (
        <Spinner className="size-5" />
      ) : (
        <>
          {label}
          <Image src={googleIcon} alt="Google icon" className="h-5 w-5 ms-2" />
        </>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
