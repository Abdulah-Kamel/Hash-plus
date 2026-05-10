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
  Loader2,
} from "lucide-react";
import { getMyProfile, updateMyProfile, getProfileImage } from "@/actions/profileActions";
import { toast } from "sonner";

// Social media link names as sent to the API
const SOCIAL_LINK_NAMES = {
  twitter: "twitter",
  instagram: "instagram",
  linkedin: "linkedin",
  facebook: "facebook",
  youtube: "youtube",
  tiktok: "tiktok",
};

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const formSchema = z.object({
    name: z.string("الاسم غير صحيح").min(1, "الاسم مطلوب"),
    description: z.string().optional().default(""),
    lang: z.string().default("ar"),
    twitter: z.string().optional().default(""),
    instagram: z.string().optional().default(""),
    linkedin: z.string().optional().default(""),
    facebook: z.string().optional().default(""),
    youtube: z.string().optional().default(""),
    tiktok: z.string().optional().default(""),
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

  // Fetch profile data on mount
  useEffect(() => {
    async function loadProfile() {
      setFetching(true);
      try {
        const [profileRes, imageRes] = await Promise.all([
          getMyProfile(),
          getProfileImage(),
        ]);

        if (profileRes.success && profileRes.data) {
          const profile = profileRes.data;

          // Map API links array to flat form fields
          const linksMap = {};
          if (profile.links?.length) {
            profile.links.forEach((link) => {
              const key = link.name?.toLowerCase();
              if (key && SOCIAL_LINK_NAMES[key] !== undefined) {
                linksMap[key] = link.url || "";
              }
            });
          }

          reset({
            name: profile.name || "",
            description: profile.bio || "",
            lang: profile.languages?.[0]?.language || "ar",
            twitter: linksMap.twitter || "",
            instagram: linksMap.instagram || "",
            linkedin: linksMap.linkedin || "",
            facebook: linksMap.facebook || "",
            youtube: linksMap.youtube || "",
            tiktok: linksMap.tiktok || "",
          });
        }

        if (imageRes.success && imageRes.data?.url) {
          setProfileImageUrl(imageRes.data.url);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setFetching(false);
      }
    }
    loadProfile();
  }, [reset]);

  async function onSubmit(data) {
    setLoading(true);
    try {
      // Build the links array from flat form fields
      const links = Object.entries(SOCIAL_LINK_NAMES)
        .filter(([key]) => data[key]?.trim())
        .map(([key]) => ({
          name: key,
          url: data[key].trim(),
        }));

      const payload = {
        name: data.name,
        bio: data.description || "",
        links,
      };

      // Only send languages if changed from default
      if (data.lang) {
        payload.languages = [{ language: data.lang, proficiency: "native" }];
      }

      const res = await updateMyProfile(payload);
      if (res.success) {
        toast.success("تم حفظ الملف الشخصي بنجاح");
      } else {
        toast.error(res.error || "فشل حفظ الملف الشخصي");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
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

  if (fetching) {
    return (
      <section className="space-y-4">
        <Card className="gap-3 p-4 grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-full flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <Card className="gap-3 p-4 grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <h2 className="font-semibold text-xl">الصورة الشخصية</h2>
          <ProfileImageInput
            currentImageUrl={profileImageUrl}
            onImageChange={(url) => setProfileImageUrl(url)}
          />
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
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserProfile;
