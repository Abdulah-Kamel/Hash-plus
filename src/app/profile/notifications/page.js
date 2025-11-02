"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationsPage = () => {
  const [loading, setLoading] = useState(false);

  const notificationsSchema = z.object({
    advertisements: z.boolean().default(false),
    offers: z.boolean().default(false),

    learningEnabled: z.boolean().default(true),
    learningStatistics: z.boolean().default(true),
    contentSuggestions: z.boolean().default(true),
    teacherNotifications: z.boolean().default(true),
  });

  const notificationsForm = useForm({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      advertisements: false,
      offers: false,
      learningEnabled: true,
      learningStatistics: true,
      contentSuggestions: true,
      teacherNotifications: true,
    },
  });

  const onNotificationsSubmit = async (data) => {
    setLoading(true);
    console.log("Notifications data:", data);
    setLoading(false);
  };

  return (
    <section className="space-y-4">
      <Card className="p-6 gap-3">
        <CardHeader className="border-b [.border-b]:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              التحديثات والعروض
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="advertisements"
                dir="ltr"
                className="h-[1.25rem] cursor-pointer"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex flow-row items-center ">
                <Checkbox
                  id="advertisements"
                  checked={notificationsForm.watch("advertisements")}
                  className="size-6 ml-2 rounded-sm bg-white border-2 data-[state=checked]:bg-secondary data-[state=checked]:text-white dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  onCheckedChange={(checked) =>
                    notificationsForm.setValue("advertisements", checked)
                  }
                />
                <label
                  htmlFor="advertisements"
                  className="text-right font-light text-base cursor-pointer flex-1"
                >
                  إعلانات
                </label>
              </div>

              <div className="flex flow-row items-center ">
                <Checkbox
                  id="offers"
                  checked={notificationsForm.watch("offers")}
                  className="size-6 ml-2 rounded-sm bg-white border-2 data-[state=checked]:bg-secondary data-[state=checked]:text-white dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  onCheckedChange={(checked) =>
                    notificationsForm.setValue("offers", checked)
                  }
                />
                <label
                  htmlFor="offers"
                  className="text-right font-light text-base cursor-pointer flex-1"
                >
                  العروض
                </label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="p-6 gap-3">
        <CardHeader className="border-b [.border-b]:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">تعليمك</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="learningEnabled"
                dir="ltr"
                className="h-[1.25rem] cursor-pointer"
                checked={notificationsForm.watch("learningEnabled")}
                onCheckedChange={(checked) =>
                  notificationsForm.setValue("learningEnabled", checked)
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex flow-row items-center">
                <Checkbox
                  id="learningStatistics"
                  checked={notificationsForm.watch("learningStatistics")}
                  className="size-6 ml-2 rounded-sm bg-white border-2 data-[state=checked]:bg-secondary data-[state=checked]:text-white dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  onCheckedChange={(checked) =>
                    notificationsForm.setValue("learningStatistics", checked)
                  }
                />
                <label
                  htmlFor="learningStatistics"
                  className="text-right text-base font-light cursor-pointer flex-1"
                >
                  احصائيات التعلم
                </label>
              </div>

              <div className="flex flow-row items-center">
                <Checkbox
                  id="contentSuggestions"
                  checked={notificationsForm.watch("contentSuggestions")}
                  className="size-6 ml-2 rounded-sm bg-white border-2 data-[state=checked]:bg-secondary data-[state=checked]:text-white dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  onCheckedChange={(checked) =>
                    notificationsForm.setValue("contentSuggestions", checked)
                  }
                />
                <label
                  htmlFor="contentSuggestions"
                  className="text-right text-base font-light cursor-pointer flex-1"
                >
                  ترشيحات محتوى آخر
                </label>
              </div>

              <div className="flex flow-row items-center">
                <Checkbox
                  id="teacherNotifications"
                  checked={notificationsForm.watch("teacherNotifications")}
                  className="size-6 ml-2 rounded-sm bg-white border-2 data-[state=checked]:bg-secondary data-[state=checked]:text-white dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  onCheckedChange={(checked) =>
                    notificationsForm.setValue("teacherNotifications", checked)
                  }
                />
                <label
                  htmlFor="teacherNotifications"
                  className="text-right text-base font-light cursor-pointer flex-1"
                >
                  اشعارات من المعلمين
                </label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NotificationsPage;
