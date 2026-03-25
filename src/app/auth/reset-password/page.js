"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavBar } from "@/components/navbar";
import Container from "@/components/container";
import Footer from "@/components/footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { handleResetPassword } from "@/actions/resetPasswordAction";
import { toast } from "sonner";

const ResetPasswordPage = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    otp: z.string().min(4, "الرمز يجب أن يكون 4 أرقام"),
    newPassword: z.string().min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    form.reset({
      otp: "",
      newPassword: "",
    });
  }, [form.reset]);

  async function onSubmit(data) {
    setLoading(true);
    const result = await handleResetPassword(data);
    if (result.success) {
      setLoading(false);
      toast.success(result.data.message, {
        position: "top-right",
        duration: 3000,
        classNames: "toast-success text-black mt-14",
      });
      // router.push("/reset-passowrd");
    } else {
      setLoading(false);
      toast.error(result.error.message, {
        position: "top-right",
        duration: 3000,
        classNames: "toast-error text-black mt-14",
        description: (
          <p className="font-light text-black">{result.error.message}</p>
        ),
      });
    }
  }

  return (
    <>
      <Container className="my-6 flex justify-center items-center  py-12">
        <Card className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
          <h1 className="mb-3 font-bold sm:text-xl">إعادة تعيين كلمة السر</h1>
          <CardHeader className="px-0"></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-center gap-3">
                        <FormLabel className="text-base font-medium justify-center">
                          رمز التحقق
                        </FormLabel>
                        <FormControl className="mb-0">
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                      </div>
                      <FormMessage className="text-center mb-4" />
                      <FormDescription className="text-center">
                        ادخل رمز التحقق المرسل عبر البريد الإلكتروني.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 w-1/2 m-auto my-4 ">
                      <FormLabel className="justify-center">
                        كلمة السر الجديدة
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="ادخل كلمة السر الجديدة"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="cursor-pointer px-4 py-2 sm:py-4 rounded-lg max-sm:text-xs"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner className="size-8" />
                    ) : (
                      "إعادة تعيين كلمة السر"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
/*
Server returned an error: {"status":"fail","err":{"statusCode":400,"status":"fail"},"message":"من فضلك قم بالتحقق من رمز التحقق اولا","stack":"Error: من فضلك قم بالتحقق من رمز التحقق اولا\n    at resetPassword (file:///data/app/src/controllers/auth.controller.js:447:19)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)"}
*/
