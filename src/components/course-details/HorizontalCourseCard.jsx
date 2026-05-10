"use client";
import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {Star, Clock, BookOpen, User, BookOpenText} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from "../shared/Rating";
import courseProfile from "@/assets/courseProfile.png";
import saRyal from "@/assets/saRyal.svg";
import course1 from "@/assets/course1.png";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const contentTypeLabels = {
  course: "كورس",
  bootcamp: "معسكر",
};

const levelLabels = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
};

const HorizontalCourseCard = ({ course }) => {
    const addItem = useCartStore((state) => state.addItem);

    const price = course?.price?.amount ?? 0;
    const duration = course?.metadata?.duration ?? 0;
    const modulesCount = course?.metadata?.modulesCount ?? 0;
    const avgRatings = course?.metadata?.avgRatings ?? 0;
    const ratingsCount = course?.metadata?.ratingsCount ?? 0;
    const contentTypeLabel = contentTypeLabels[course?.contentType] || course?.contentType;
    const levelLabel = levelLabels[course?.level] || course?.level;

    const handleSubscribe = () => {
      if (!course?._id && !course?.id) {
        toast.error("بيانات الدورة غير مكتملة");
        return;
      }
      addItem({
        id: course._id || course.id,
        title: course.title || "دورة تدريبية",
        price: price ?? 0,
        thumbnail: course.thumbnail || null,
        contentType: course.contentType || "course",
        instructor: course.instructor?.name || course.instructor || "ولاء القحطاني",
        instructorId: course.instructor?._id || course.instructorId || 1,
        rating: avgRatings,
        duration: duration,
        level: course.level || "beginner",
      });
      toast.success("تم الإضافة إلى السلة");
    };

    return (
      <Card className="w-full rounded-2xl p-0">
        <div className="flex flex-col xl:flex-row gap-4 p-4">
          <Link href={`/course/${course?._id}`} className="block flex-shrink-0">
            <Image
              className="w-full xl:w-64 h-full object-cover rounded-lg"
              src={course?.thumbnail || course1}
              alt={course?.title}
              width={192}
              height={128}
            />
          </Link>

          <div className="flex flex-col xl:flex-row flex-grow justify-between items-center gap-6">
            <div className="flex-grow w-full space-y-3">
              <div className="flex max-xl:flex-col gap-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="px-3 py-1 rounded-full border-gray-900 border-1 text-xs"
                  >
                    {contentTypeLabel}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 rounded-full border-gray-900 border-1 text-xs"
                  >
                    {levelLabel}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    ({ratingsCount})
                  </span>
                  <div className="flex items-center gap-1">
                    <Rating rating={avgRatings} />
                    <span className="text-muted-foreground text-sm">
                      {avgRatings.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium">{course?.title}</h3>

              <div className="flex items-center gap-2">
                <Link href={`/teacher/${course?.instructor}`}>
                  <Image
                    className="rounded-full bg-gray-100 cursor-pointer"
                    src={courseProfile}
                    alt="Instructor avatar"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
              <div className="flex items-center gap-4 xl:gap-50 border-b mx-2 xl:mx-5 pb-4 mt-3 text-base xl:text-lg">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <p>{duration} ساعة</p>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <BookOpenText className="w-6 h-6" />
                  <p>{modulesCount} درس</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl font-medium text-gray-900 flex gap-1 items-center">
                  <span>{price}</span>
                  <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
                </div>
                <Button
                  onClick={handleSubscribe}
                  variant="outline"
                  className="rounded-full max-xl:text-sm px-3 xl:px-8 py-4"
                >
                  اشترك الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
};

export default HorizontalCourseCard;
