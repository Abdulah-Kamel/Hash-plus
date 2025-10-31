"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/form/FormField";
import ProfileImageInput from "@/components/profile/ProfileImageInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string("الاسم غير صحيح").min(1, "الاسم مطلوب"),
    description: z.string("الوصف غير صحيح").min(1, "الوصف مطلوب"),
    lang: z.string().default("ar"),
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      lang: "ar",
    },
  });

  useEffect(() => {
    reset({
      name: "",
      description: "",
      lang: "ar",
    });
  }, [reset]);

  async function onSubmit(data) {
    setLoading(true);
    // const result = await handleLogin(data);
    // if (result.success) {
    //     setLoading(false)
    //     toast.success("تم تسجيل الدخول بنجاح", {
    //         position: "top-right",
    //         duration: 3000,
    //         classNames: "toast-success text-black mt-14"
    //     });

    // } else {
    //     setLoading(false)
    //     toast.error("حدث خطأ أثناء تسجيل الدخول", {
    //         position: "top-right",
    //         duration: 3000,
    //         classNames: "toast-error text-black mt-14",
    //         description: <p className="font-light text-black">{result.error}</p>,
    //     });
    // }
  }
  return (
    <section className="space-y-4">
      <Card className="gap-3 p-4 grid grid-cols-3">
        <div className="col-span-1 space-y-4">
          <h2 className="font-semibold text-xl">الصورة الشخصية</h2>
          <ProfileImageInput />
        </div>
        <div className="col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={control}
                name="name"
                label="الاسم"
                placeholder="الاسم"
                type="text"
                autoComplete="name"
                className="rounded-2xl"
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">سيرتك</FieldLabel>
                    <Textarea
                      id="description"
                      {...field}
                      className="h-20"
                      placeholder="اكتب هنا"
                      rows={4}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name=""
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lang">اللغة</FieldLabel>
                    <Select dir="rtl">
                      <SelectTrigger
                        id="lang"
                        className="w-[180px] py-6 rounded-2xl focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                      >
                        <SelectValue placeholder="اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">الانجليزية</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </form>
        </div>
      </Card>
      <Card className="gap-3 p-4 grid grid-cols-3">
        <CardHeader>
          <CardTitle className="font-semibold text-xl">الروابط</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};

export default UserProfile;
