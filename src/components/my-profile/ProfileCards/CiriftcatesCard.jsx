"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2 } from "lucide-react";
import Image from "next/image";
import cirtifacte from "@/assets/cirtifacte.png";
import AddCertificateDialog from "../dialogs/AddCertificateDialog";
const CiriftcatesCard = () => {
  const [certificates, setCertificates] = useState([]);

  const handleCertificateAdd = (newCertificate) => {
    const certificateWithId = {
      ...newCertificate,
      id: Date.now(),
    };
    setCertificates((prev) => [...prev, certificateWithId]);
  };

  return (
    <Card className="space-y-2 p-5 gap-0">
      <div className="flex items-center justify-between">
        <h3 className="font-normal text-xl">الشهادات</h3>
        <div className="flex items-center gap-2">
          <AddCertificateDialog
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
              >
                <Plus className="size-5 text-primary" />
              </Button>
            }
            onSave={handleCertificateAdd}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Card className="border-0 rounded-none shadow-none gap-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex max-sm:flex-col gap-2">
              <div className="max-w-86 rounded-2xl flex items-center justify-center">
                <Image
                  src={cirtifacte}
                  alt="cirtifacte"
                  className="w-full object-cover rounded-lg"
                />
              </div>
              <div className="text-right space-y-4">
                <h4 className="font-semibold text-xl">
                  Google Graphic Design Certificate
                </h4>
                <div>
                  <p className="font-medium">Google</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>2024 سبتمبر</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <a href="#" className="text-secondary underline">
                      رابط التحقق
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا
                  النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
                  التي يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات
                  يتيح لك مولد النص العربي زيادة عدد الفقرات كما تريد،
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
              >
                <Edit2 className="size-5 text-primary" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default CiriftcatesCard;
