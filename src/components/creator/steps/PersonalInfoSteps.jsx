"use client";
import React, { useState } from "react";
import { Plus, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddEducationDialog from "@/components/my-profile/dialogs/AddEducationDialog";
const PersonalInfoSteps = () => {
  const [education, setEducation] = useState([
    {
      id: 1,
      university: "جامعة الملك فهد",
      college: "كلية التصميم",
      department: "قسم تصميم جرافيك",
      startYear: "2019",
      endYear: "2024",
    },
  ]);

  return (
    <div className="flex flex-col h-full py-8">
      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-right">
          ما هي خبرتك الدراسية
        </h2>
        <p className="text-md leading-relaxed text-muted-foreground mb-6 text-right">
          بمجرد نشر محتواك، يمكنك توسيع قاعدة طلابك وإحداث تأثير إيجابي بدعم من
          عروض هاش بلس الترويجية، بالإضافة إلى جهودك التسويقية الخاصة. معًا،
          سنساعد الطلاب المناسبين على اكتشاف دورتك.
        </p>

        <div className="space-y-6">
          {/* Experiences Section */}
          <Card className="rounded-3xl gap-2">
            <CardHeader className="border-b [.border-b]:pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-right">التعليم</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {education.map((edu) => (
                  <div className="flex gap-2" key={edu.id}>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium text-lg text-gray-900">
                        {edu.university}
                      </h4>
                      <p className="font-medium text-gray-700">
                        {edu.college}، {edu.department}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <CardFooter className="px-4">
                  <AddEducationDialog
                    trigger={
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 bg-primary/15 hover:bg-primary/20 py-6 w-full rounded-full cursor-pointer text-primary hover:text-primary"
                      >
                        اضف تعليم
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

export default PersonalInfoSteps;
