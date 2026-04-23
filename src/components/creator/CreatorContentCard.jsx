"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import course1 from "@/assets/course1.png";

const contentTypeLabels = {
  course: "كورس",
  bootcamp: "معسكر",
};

const CreatorContentCard = ({ course }) => {
  const thumbnail = course.thumbnail?.url || course1;
  const contentTypeLabel = contentTypeLabels[course.contentType] || course.contentType;

  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl pt-0 gap-1 p-4 shadow-sm border border-gray-100">
      <div className="relative">
        <Image
          className="w-full h-48 object-cover rounded-xl"
          src={thumbnail}
          alt={course.title}
          width={384}
          height={192}
        />
      </div>
      <CardHeader className="flex-grow px-0 pt-3 pb-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="px-3 py-1 rounded-full border-gray-200 text-xs font-semibold"
          >
            {contentTypeLabel}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1 rounded-full border-gray-200 text-xs font-semibold"
          >
            {course.level === "beginner" ? "مبتدئ" : course.level === "intermediate" ? "متوسط" : course.level === "advanced" ? "متقدم" : course.level}
          </Badge>
        </div>

        <CardTitle className="text-lg font-bold text-gray-900 truncate">
          {course.title}
        </CardTitle>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {course.description || "لا يوجد وصف"}
        </p>
      </CardHeader> 
      <CardFooter className="pt-3 px-0 border-t border-gray-50 flex justify-between mt-auto">
        <Link href={`/creator/content/${course._id}`} className="w-full">
          <Button
            className="w-full rounded-full cursor-pointer bg-primary text-white hover:bg-primary/90"
          >
            تعديل المحتوى
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CreatorContentCard;
