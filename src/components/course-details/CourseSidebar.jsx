import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    SaudiRiyal,
    Heart,
    FileDown,
    SquarePlay, Globe, Infinity, NotepadText, Trophy, Send
} from 'lucide-react';
import Image from "next/image";
import courseImage from "@/assets/course1.png"

const languageLabels = {
  ar: "اللغة العربية",
  en: "اللغة الإنجليزية",
};

const CourseSidebar = ({ courseDetails }) => {
  const price = courseDetails?.price?.amount ?? 0;
  const duration = courseDetails?.metadata?.duration ?? 0;
  const materialsCount = courseDetails?.materials?.length ?? 0;
  const language = languageLabels[courseDetails?.language] || courseDetails?.language;
  const thumbnail = courseDetails?.thumbnail;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-100 shadow-md">
          <CardHeader>
              <Image src={thumbnail || courseImage} alt="course image" className="w-full" width={400} height={200} />
              <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-3xl flex items-center gap-1">
                      {price}
                      <SaudiRiyal width={36} height={36} />
                  </span>
              </div>
          </CardHeader>
        <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3 items-center">
            <Button className="col-span-3 w-full bg-primary hover:bg-primary/90 text-white cursor-pointer py-5 text-lg font-medium rounded-lg">
                اشترك الآن
            </Button>
            <div className="col-span-1 flex justify-center">
                <Button variant="outline" className="w-full border border-primary cursor-pointer hover:bg-gray-50 rounded-lg py-5">
                  <Heart className="text-primary w-6 h-6" />
                </Button>
            </div>
            </div>

            <Button variant="outline" className="w-full border border-primary text-primary hover:text-primary cursor-pointer  py-5 text-lg font-medium rounded-lg">
                ابدأ التعلم
            </Button>

            <div className="mt-4">
                <h3>هذه الدوره تحتوى على:</h3>
                <ul className="space-y-4 mt-3">
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <FileDown />
                        <span>{materialsCount} ملف للتحميل</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <SquarePlay />
                        <span>{duration} ساعة من الفيديوهات</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <Globe />
                        <span>{language}</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <Infinity />
                        <span>محتوى مدى الحياة</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <NotepadText />
                        <span>اختبار نهائي</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <Trophy />
                        <span>شهادة بنهاية الدورة</span>
                    </li>
                </ul>
            </div>
        </CardContent>
          <CardFooter className="border-t mx-4">
              <Button variant={"outline"} className="w-full py-6 text-primary hover:text-primary border-none cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg">
                  <Send className="size-6"/>
                  شارك الدورة مع أصدقائك
              </Button>
          </CardFooter>
      </Card>
    </div>
  );
};

export default CourseSidebar;
