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
const CourseSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <Card className="border-2 border-gray-100 shadow-md">
          <CardHeader>
              <Image src={courseImage} alt="course image" className="w-full"/>
              <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-3xl flex items-center gap-1">
                      30
                      <SaudiRiyal width={36} height={36} />
                  </span>
                  <span className="text-2xl text-muted-foreground flex items-center gap-1">
                      30
                      <SaudiRiyal width={28} height={28} />
                  </span>
              </div>
          </CardHeader>
        <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3 items-center">
            {/* Add to Cart Button */}
            <Button className="col-span-3 w-full bg-primary hover:bg-primary/90 text-white cursor-pointer py-3 text-lg font-medium rounded-lg">
                أضف إلى السلة
            </Button>
            {/* Wishlist Button */}
            <div className="col-span-1 flex justify-center">
                <Button variant="outline" className="w-full border border-primary cursor-pointer hover:bg-gray-50 rounded-lg">
                  <Heart className="text-primary w-6 h-6" />
                </Button>
            </div>
            </div>

            {/* Buy Now Button */}
            <Button variant="outline" className="w-full border border-primary text-primary hover:text-primary cursor-pointer  py-5 text-lg font-medium rounded-lg">
                اشتري الآن
            </Button>

            <div className="mt-4">
                <h3>هذه الدوره تحتوى على:</h3>
                <ul className="space-y-4 mt-3">
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <FileDown />
                        <span>40 ملف للتحميل</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <SquarePlay />
                        <span>40 ساعة من الفيديوهات</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                        <Globe />
                        <span>اللغة العربية</span>
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
