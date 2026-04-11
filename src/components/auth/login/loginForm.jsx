"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import googleIcon from "@/assets/google-icon.svg";
import Image from "next/image";
import { handleLogin } from "@/components/auth/login/loginActions";
import FormField from "@/components/form/FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    email: z.email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(1, "كلمة السر مطلوبة"),
    rememberMe: z.boolean().optional(),
    role: z.string(),
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      role: role,
    },
  });

  useEffect(() => {
    reset({
      email: "",
      password: "",
      rememberMe: false,
      role: role,
    });
  }, [reset]);

  async function onSubmit(data) {
    setLoading(true);
    const result = await handleLogin(data);
    console.log("result", result);
    if (result.success) {
      setLoading(false);
      toast.success("تم تسجيل الدخول بنجاح", {
        position: "top-right",
        duration: 3000,
        classNames: "toast-success text-black mt-14",
      });
      router.push(role === "teacher" ? "/creator/home" : "/");
    } else {
      setLoading(false);
      toast.error(result.error, {
        position: "top-right",
        duration: 3000,
        classNames: "toast-error text-black mt-14",
        description: <p className="font-light text-black">{result.error}</p>,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormField
          control={control}
          name="email"
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          type="email"
          autoComplete="email"
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex justify-between items-center">
                <FieldLabel htmlFor={field.name}>كلمة السر</FieldLabel>
                <Link
                  href={"/auth/forget-password"}
                  className="text-primary hover:underline"
                >
                  نسيت كلمة السر؟
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="ادخل كلمة السر"
                  className="h-10 sm:h-12"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 cursor-pointer flex items-center px-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="rememberMe"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  تذكرنى
                </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit Buttons */}
        <div className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs"
            disabled={loading}
          >
            {loading ? <Spinner className="size-8" /> : "تسجيل الدخول"}
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer px-5 py-2 sm:py-6 rounded-lg mt-2 max-sm:text-xs"
            disabled={loading}
          >
            {loading ? (
              <Spinner className="size-8" />
            ) : (
              "تسجيل الدخول عن طريق جوجل"
            )}
            <Image
              src={googleIcon}
              alt="google logog icon"
              className="h-5 w-5"
            />
          </Button>
          <div className="mt-3 max-sm:text-xs text-center font-light">
            ليس لديك حساب؟
            <Link
              href="/auth/register"
              className="ms-2 text-primary hover:underline"
            >
              انشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
