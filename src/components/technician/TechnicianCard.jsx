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

const TechnicianCard = () => {
  return (
    <Card className="gap-3 p-4 flex sm:flex-row">
      <Image
        src={technician}
        alt={"course_icon3"}
        className="w-full sm:w-48 h-40 rounded-xl"
      />
      <div className="space-y-4">
        <h4 className="text-xl font-semibold max-sm:text-center">محمد على</h4>
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
      </div>
      <div className="flex justify-center sm:justify-between flex-col sm:ms-auto">
        <div className="flex max-sm:justify-center items-center gap-12">
          <div>
            <span className="font-normal text-xl flex items-center gap-1">
              <div className="bg-secondary rounded-sm p-[4px]">
                <Play className="text-white size-4" />
              </div>
              12
            </span>
            <span className="text-muted-foreground text-sm">محتوى</span>
          </div>
          <div>
            <span className="font-normal text-xl flex items-center gap-1">
              <Star className="text-yellow-500 size-4" />
              4.6
            </span>
            <span className="text-muted-foreground text-sm">406 تقييم</span>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="max-sm:mt-4 w-full py-6 px-9 cursor-pointer hover:bg-gray-50 rounded-full"
        >
          عرض التفاصيل
        </Button>
      </div>
    </Card>
  );
};

export default TechnicianCard;
