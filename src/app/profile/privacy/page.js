"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const PrivacyPage = () => {
  const [loading, setLoading] = useState(false);

  const privacySchema = z.object({
    showProfilePublic: z.boolean().default(false),
    showEducationalContent: z.boolean().default(false),
  });

  const privacyForm = useForm({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      showProfilePublic: false,
      showEducationalContent: false,
    },
  });

  const onPrivacySubmit = async (data) => {
    setLoading(true);
    console.log("Privacy data:", data);
    setLoading(false);
  };

  return (
    <section className="space-y-4">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="font-semibold text-xl text-right">
            التحديثات و العروض
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form
            onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}
            className="space-y-6"
          >
            <div className="flex flow-row items-center gap-2">
              <Checkbox
                id="showProfilePublic"
                checked={privacyForm.watch("showProfilePublic")}
                className="size-6 mr-2 rounded-sm bg-white border-primary border-2"
                onCheckedChange={(checked) =>
                  privacyForm.setValue("showProfilePublic", checked)
                }
              />
              <label
                htmlFor="showProfilePublic"
                className="text-right cursor-pointer"
              >
                اظهر ملفك الشخصي بشكل عام
              </label>
            </div>
            <div className="flex flow-row items-center gap-2">
              <Checkbox
                id="showEducationalContent"
                checked={privacyForm.watch("showEducationalContent")}
                className="size-6 mr-2 rounded-sm bg-white border-primary border-2"
                onCheckedChange={(checked) =>
                  privacyForm.setValue("showEducationalContent", checked)
                }
              />
              <label
                htmlFor="showEducationalContent"
                className="text-right cursor-pointer"
              >
                اشهر المحتوى التعليمي الخاص بك على ملفك الشخصي
              </label>
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

export default PrivacyPage;
