"use client";
import React, { useState } from "react";
import { Plus, Calendar, MapPin, BriefcaseBusiness, Edit2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddExperienceDialog from "@/components/my-profile/dialogs/AddExperienceDialog";

const LearningStep = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Vertex",
      position: "Art Director",
      duration: "1 سنة و 1 شهر",
      startDate: "01/08/2024",
      endDate: "حتى الآن",
      location: "الرياض، السعودية",
      type: "من الموقع",
    },
  ]);

  return (
    <div className="flex flex-col h-full py-8">
      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-right">
          ما هي خبرتك العملية
        </h2>
        <p className="text-md leading-relaxed text-muted-foreground mb-6 text-right">
          بمجرد نشر محتواك، يمكنك توسيع قاعدة طلابك وأحداث تأثير إيجابي بدعم من
          عروض هاش بلس الترويجية. بالإضافة إلى جهودك التسويقية الخاصة معاً،
          سنساعد الطلاب المناسبين على اكتشاف دورتك.
        </p>

        <div className="space-y-6">
          {/* Experiences Section */}
          <Card className="rounded-3xl gap-2">
            <CardHeader className="border-b [.border-b]:pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-right">الخبرات</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <div className="flex gap-2" key={experience.id}>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <BriefcaseBusiness className="w-6 h-6 rounded-lg"></BriefcaseBusiness>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium text-lg text-gray-900">
                        Incooders
                      </h4>
                      <p className="font-medium">Senior Graphic Designer</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span> 01/08/2024 - 20/05/2021</span>
                        <span>•</span>
                        <span>3 سنين و 3 أشهر</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>الرياض، السعودية</span>
                        <span>•</span>
                        <span>من الموقع</span>
                      </div>
                    </div>
                  </div>
                ))}
                <CardFooter className="px-4">
                  <AddExperienceDialog
                    trigger={
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 bg-primary/15 hover:bg-primary/20 py-6 w-full rounded-full cursor-pointer text-primary hover:text-primary"
                      >
                        اضف خبرة
                        <div className="border border-primary rounded-full p-1">
                          <Plus className="size-4 text-primary" />
                        </div>
                      </Button>
                    }
                  />
                </CardFooter>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningStep;
