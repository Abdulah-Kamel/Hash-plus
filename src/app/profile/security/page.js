"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormField from "@/components/form/FormField";
import { Edit, X } from "lucide-react";
import PasswordField from "@/components/form/PasswordField";

const SecurityPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  const [userData, setUserData] = useState({
    email: "mohaemdalii@gmail.com",
    phone: "+966 528562352",
  });

  const emailSchema = z.object({
    email: z
      .email("البريد الإلكتروني غير صحيح")
      .min(1, "البريد الإلكتروني مطلوب"),
  });

  const phoneSchema = z.object({
    phone: z.string().min(10, "رقم الهاتف غير صحيح").min(1, "رقم الهاتف مطلوب"),
  });

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
      newPassword: z
        .string()
        .min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل"),
      confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "كلمة المرور غير متطابقة",
      path: ["confirmPassword"],
    });

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: userData.email,
    },
  });

  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: userData.phone,
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = async (data) => {
    setLoading(true);
    console.log("Email data:", data);

    setUserData((prev) => ({ ...prev, email: data.email }));
    setEmailDialogOpen(false);
    setLoading(false);
  };

  const onPhoneSubmit = async (data) => {
    setLoading(true);
    console.log("Phone data:", data);

    setUserData((prev) => ({ ...prev, phone: data.phone }));
    setPhoneDialogOpen(false);
    setLoading(false);
  };

  const onPasswordSubmit = async (data) => {
    setLoading(true);
    console.log("Password data:", data);

    passwordForm.reset();
    setLoading(false);
  };

  return (
    <section className="space-y-4">
      <Card className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-right mb-2">
                البريد الإلكتروني
              </h3>
              <div className="relative">
                <Input
                  value={userData.email}
                  disabled
                  className="rounded-2xl h-14 text-righ border-2"
                  dir="rtl"
                />
                <Dialog
                  open={emailDialogOpen}
                  onOpenChange={setEmailDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-10 w-10 cursor-pointer rounded-sm bg-secondary hover:bg-secondary/70"
                    >
                      <Edit className="text-white" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </div>
          <Dialog
            open={emailDialogOpen}
            onOpenChange={setEmailDialogOpen}
            dir="rtl"
          >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-5xl" showCloseButton={false}>
              <DialogHeader className="text-right flex flex-row items-center justify-between">
                <DialogTitle className="text-xl font-semibold">
                  تغيير البريد الإلكتروني
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEmailDialogOpen(false)}
                  className="h-10 w-10 rounded-full hover:bg-muted cursor-pointer"
                >
                  <X className="size-6" />
                </Button>
              </DialogHeader>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="mahmoudomar@gmail.com"
                  type="email"
                  autoComplete="email"
                  className="rounded-2xl"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl font-medium"
                >
                  {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-right mb-2">
                رقم الهاتف
              </h3>
              <div className="relative">
                <Input
                  value={userData.phone}
                  disabled
                  className="rounded-2xl h-14 text-right border-2"
                />
                <Dialog
                  open={phoneDialogOpen}
                  onOpenChange={setPhoneDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-10 w-10 cursor-pointer rounded-sm bg-secondary hover:bg-secondary/70"
                    >
                      <Edit className="text-white" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </div>
          <Dialog
            open={phoneDialogOpen}
            onOpenChange={setPhoneDialogOpen}
            dir="rtl"
          >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-5xl" showCloseButton={false}>
              <DialogHeader className="text-right flex flex-row items-center justify-between">
                <DialogTitle className="text-xl font-semibold">
                  تغيير رقم الهاتف
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPhoneDialogOpen(false)}
                  className="h-10 w-10 rounded-full hover:bg-muted cursor-pointer"
                >
                  <X className="size-6" />
                </Button>
              </DialogHeader>
              <form
                onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="+966 528562352"
                  type="tel"
                  autoComplete="tel"
                  className="rounded-2xl"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl font-medium"
                >
                  {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="font-semibold text-xl">كلمة المرور</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-6"
          >
            <PasswordField
              control={passwordForm.control}
              label="كلمة السر الحالية"
              name="currentPassword"
              placeholder="ادخل كلمة السر الحالية"
              autoComplete="currentPassword"
            />
            <PasswordField
              control={passwordForm.control}
              label="كلمة السر الجديدة"
              name="newPassword"
              placeholder="ادخل كلمة السر الجديدة"
              autoComplete="newPassword"
            />
            <PasswordField
              control={passwordForm.control}
              label="اعد كتابة كلمة السر"
              name="confirmPassword"
              placeholder="اعد كتابة كلمة السر"
              autoComplete="confirmPassword"
            />
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-full font-medium cursor-pointer"
              >
                {loading ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SecurityPage;
