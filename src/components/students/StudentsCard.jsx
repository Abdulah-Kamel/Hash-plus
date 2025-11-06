import React from "react";
import technician from "@/assets/technician.png";
import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  GraduationCap,
  Languages,
  Play,
  SquarePlay,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const StudentsCard = () => {
  return (
    <Card className="gap-3 p-4 flex sm:flex-row">
      <Image
        src={technician}
        alt={"course_icon3"}
        className="w-full sm:w-48 h-40 sm:h-full rounded-xl"
      />
     <div className="flex max-md:flex-col gap-3">
     <div className="space-y-3">
        <h4 className="text-xl font-semibold max-sm:text-center">محمد على</h4>
        <p className="text-muted-foreground text-sm">مصمم جرافيك</p>
        <p className="text-muted-foreground text-sm">
          معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير
          مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على
          التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج
          احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات
          التقنيات الحديثة، بمنهجيّة تعلُّم
        </p>
      </div>
      <div className="flex justify-center sm:justify-between flex-col md:ms-auto md:px-4 md:border-r">
        <ul className="space-y-2">
          <li className="flex items-center gap-1 text-muted-foreground">
            <BriefcaseBusiness className="mr-2 size-5" />
            <span className="font-normal">مصمم</span>
          </li>
          <li className="flex items-center gap-1 text-muted-foreground">
            <Languages className="mr-2 size-5" />
            <span className="font-normal">اللغة العربية</span>
          </li>
          <li className="flex items-center gap-1 text-muted-foreground">
            <GraduationCap className="mr-2 size-5" />
            <span className="font-normal">10,170 طالب</span>
          </li>
          <li className="flex items-center gap-1 text-muted-foreground">
            <SquarePlay className="mr-2 size-5" />
            <span className="font-normal">12 محتوى</span>
          </li>
        </ul>
        <Button
          variant={"outline"}
          className="mt-4 w-full py-6 px-9 cursor-pointer hover:bg-gray-50 rounded-full"
        >
          عرض التفاصيل
        </Button>
      </div>
     </div>
    </Card>
  );
};

export default StudentsCard;
