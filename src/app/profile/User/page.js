"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Music,
} from "lucide-react";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string("الاسم غير صحيح").min(1, "الاسم مطلوب"),
    description: z.string("الوصف غير صحيح").min(1, "الوصف مطلوب"),
    lang: z.string().default("ar"),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      lang: "ar",
      twitter: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      tiktok: "",
    },
  });

  useEffect(() => {
    reset({
      name: "",
      description: "",
      lang: "ar",
      twitter: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      tiktok: "",
    });
  }, [reset]);

  async function onSubmit(data) {
    setLoading(true);
    console.log("Form data:", data);
    setLoading(false);
  }

  const socialMediaFields = [
    {
      name: "twitter",
      label: "X link...",
      placeholder: "https://x.com/username",
      icon: Twitter,
    },
    {
      name: "instagram",
      label: "Instagram link...",
      placeholder: "https://instagram.com/username",
      icon: Instagram,
    },
    {
      name: "linkedin",
      label: "Linkedin link...",
      placeholder: "https://linkedin.com/in/username",
      icon: Linkedin,
    },
    {
      name: "facebook",
      label: "Facebook link...",
      placeholder: "https://facebook.com/username",
      icon: Facebook,
    },
    {
      name: "youtube",
      label: "Youtube link...",
      placeholder: "https://youtube.com/@username",
      icon: Youtube,
    },
    {
      name: "tiktok",
      label: "Tiktok link...",
      placeholder: "https://tiktok.com/@username",
      icon: Music,
    },
  ];

  return (
    <section className="space-y-4">
      <Card className="gap-3 p-4 grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <h2 className="font-semibold text-xl">الصورة الشخصية</h2>
          <ProfileImageInput />
        </div>
        <div className="col-span-1 lg:col-span-2">
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
                      className="h-20 rounded-2xl"
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
                name="lang"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lang">اللغة</FieldLabel>
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
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
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="font-semibold text-xl">الروابط</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-6 w-full">
              {socialMediaFields.map((social) => (
                <Controller
                  key={social.name}
                  name={social.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                          <social.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <Input
                          {...field}
                          placeholder={social.label}
                          className="pr-12 rounded-2xl h-12 focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                          dir="rtl"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}
            </div>

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

export default UserProfile;
