"use client";
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

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { addToCart } from '@/actions/cartActions';

const languageLabels = {
  ar: "اللغة العربية",
  en: "اللغة الإنجليزية",
};

const CourseSidebar = ({ courseDetails }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const price = courseDetails?.price?.amount ?? 0;
  const duration = courseDetails?.metadata?.duration ?? 0;
  const materialsCount = courseDetails?.materials?.length ?? 0;
  const language = languageLabels[courseDetails?.language] || courseDetails?.language;
  const thumbnail = courseDetails?.thumbnail;

  const handleSubscribe = async () => {
    if (!courseDetails?._id && !courseDetails?.id) {
      toast.error("بيانات الدورة غير مكتملة");
      return;
    }

    const contentType = courseDetails.contentType || "course";
    if (contentType !== "bootcamp") {
      toast.info("الدورات ستكون متاحة قريباً عبر نظام الاشتراكات");
      return;
    }
    
    // Add to local state optimistically
    const contentId = courseDetails._id || courseDetails.id;
    addItem({
      id: contentId,
      title: courseDetails.title || "دورة تدريبية",
      price: price,
      thumbnail: thumbnail || null,
      contentType: contentType,
      instructor: courseDetails.instructor?.name || courseDetails.instructor || "ولاء القحطاني",
      instructorId: courseDetails.instructor?._id || courseDetails.instructorId || 1,
      rating: courseDetails.metadata?.avgRatings || 0,
      duration: duration,
      level: courseDetails.level || "beginner",
    });
    
    toast.success("تم الإضافة إلى السلة");
    
    // Add to backend cart
    await addToCart(contentId);
    
    router.push("/cart");
  };

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
            <Button onClick={handleSubscribe} className="col-span-3 w-full bg-primary hover:bg-primary/90 text-white cursor-pointer py-5 text-lg font-medium rounded-lg">
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
                <h3>هذا المعسكر يحتوي على:</h3>
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
                        <span>شهادة بنهاية المعسكر</span>
                    </li>
                </ul>
            </div>
        </CardContent>
          <CardFooter className="border-t mx-4">
              <Button variant={"outline"} className="w-full py-6 text-primary hover:text-primary border-none cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg">
                  <Send className="size-6"/>
                  شارك المعسكر مع أصدقائك
              </Button>
          </CardFooter>
      </Card>
    </div>
  );
};

export default CourseSidebar;
