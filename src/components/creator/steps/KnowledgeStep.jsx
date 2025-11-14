"use client";
import React, { useState } from "react";
import { Plus, Edit, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import EditLanguagesDialog from "@/components/my-profile/dialogs/EditLanguagesDialog";

const KnowledgeStep = () => {
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([
    "العربية، اللغة الأم",
    "الإنجليزية، محترف",
  ]);
  const [skills, setSkills] = useState([
    "Adobe Photoshop",
    "Adobe Photoshop",
    "Adobe XD",
    "Adobe XD",
    "Lovart",
    "Figma",
    "Miro",
  ]);

  return (
    <div className="flex flex-col h-full py-8">
      <div>
        <h2 className="text-xl font-semibold mb-6 text-right">
          معلومات خاصة بك مهنياً
        </h2>
        <p className="text-md leading-relaxed text-muted-foreground mb-6 text-right">
          بمجرد نشر محتواك، يمكنك توسيع قاعدة طلابك وأحداث تأثير إيجابي بدعم من
          عروض هاش بلس الترويجية. بالإضافة إلى جهودك التسويقية الخاصة معاً،
          سنساعد الطلاب المناسبين على اكتشاف دورتك.
        </p>

        <div className="space-y-6">
          <Card className="rounded-3xl">
            <CardHeader className="border-b">
              <CardTitle className="text-right">الوصف الذاتي</CardTitle>
            </CardHeader>
            <div className="space-y-3 px-4">
              <Label className="text-right font-medium">وصف</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب هنا"
                className="w-full rounded-2xl border-gray-200 text-right resize-none"
                dir="rtl"
              />
            </div>
          </Card>
          <Card className="rounded-3xl">
            <CardHeader className="border-b grid grid-cols-1 sm:grid-cols-2 items-center">
              <CardTitle className="text-right">اللغات</CardTitle>
              <div className="flex items-center gap-2 col-span-1 justify-end">
                <EditLanguagesDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit2 className="size-5 text-primary" />
                    </Button>
                  }
                />

                <div className="flex items-center gap-2 bg-primary/15 py-0.5 px-2 rounded-full">
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-transparent cursor-pointer"
                  >
                    اضف لغة
                    <div className="border border-primary rounded-full p-1">
                      <Plus className="size-4 text-primary" />
                    </div>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div className="space-y-3 px-4">
              {languages.map((language) => (
                <div
                  key={language}
                  className="flex items-center justify-between"
                >
                  <p className="text-right font-medium">{language}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="rounded-3xl">
            <CardHeader className="border-b grid grid-cols-1 sm:grid-cols-2 items-center">
              <CardTitle className="text-right">المهارات</CardTitle>
              <div className="flex items-center gap-2 col-span-1 justify-end">
                <div className="flex items-center gap-2 bg-primary/15 py-0.5 px-2 rounded-full">
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-transparent cursor-pointer"
                  >
                    اضف مهارة
                    <div className="border border-primary rounded-full p-1">
                      <Plus className="size-4 text-primary" />
                    </div>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeStep;
