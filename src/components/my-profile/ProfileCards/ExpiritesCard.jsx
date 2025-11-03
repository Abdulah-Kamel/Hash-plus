"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, BriefcaseBusiness } from "lucide-react";
import AddExperienceDialog from "../dialogs/AddExperienceDialog";

const ExpiritesCard = () => {
  const [experiences, setExperiences] = useState([]);

  const handleExperienceAdd = (newExperience) => {
    const experienceWithId = {
      ...newExperience,
      id: Date.now(),
    };
    setExperiences((prev) => [...prev, experienceWithId]);
  };

  return (
    <Card className="space-y-2 p-5 gap-0">
      <div className="flex items-center justify-between">
        <h3 className="font-normal text-xl">الخبرات</h3>
        <div className="flex items-center gap-2">
          <AddExperienceDialog
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
              >
                <Plus className="size-5 text-primary" />
              </Button>
            }
            onSave={handleExperienceAdd}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Card className="border-0 border-b rounded-none shadow-none gap-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                <BriefcaseBusiness className="w-6 h-6 rounded-lg"></BriefcaseBusiness>
              </div>
              <div className="text-right">
                <h4 className="font-medium text-lg text-gray-900">Incooders</h4>
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
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
            >
              <Edit2 className="size-5 text-primary" />
            </Button>
          </div>

          <div className="text-right space-y-3 text-muted-foreground leading-7">
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها
              التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص
              العربي زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي
              أخطاء لغوية، مولد النص العربي مفيد لمصممي المواقع على وجه الخصوص،
              حيث يحتاج العميل في كثير من الأحيان أن يطلع على صورة حقيقية لتصميم
              الموقع.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" dir="rtl">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Adobe Photoshop
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Adobe Photoshop
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Adobe XD
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Adobe XD
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Lovart
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Figma
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              Miro
            </Badge>
          </div>
        </Card>
        <Card className="border-0 rounded-none shadow-none gap-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                <BriefcaseBusiness className="w-6 h-6 rounded-lg"></BriefcaseBusiness>
              </div>
              <div className="text-right">
                <h4 className="font-medium text-lg text-gray-900">Vertex</h4>
                <p className="font-medium">Art Director</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span> 01/08/2024 - حتى الان</span>
                  <span>•</span>
                  <span>1 سنة و 1 شهر</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>الرياض، السعودية</span>
                  <span>•</span>
                  <span>من الموقع</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
            >
              <Edit2 className="size-5 text-primary" />
            </Button>
          </div>

          <div className="text-right space-y-3 text-muted-foreground leading-7">
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها
              التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص
              العربي زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا
            </p>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default ExpiritesCard;
