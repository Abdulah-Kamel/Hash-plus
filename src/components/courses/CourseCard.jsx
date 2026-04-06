import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpenText } from 'lucide-react';
import Rating from '../shared/Rating';
import courseProfile from "../../assets/courseProfile.png";
import saRyal from "../../assets/saRyal.svg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import course1 from "@/assets/course1.png";

const contentTypeLabels = {
  course: "كورس",
  bootcamp: "معسكر",
};

const CourseCard = ({ course }) => {
  const price = course.price?.amount ?? 0;
  const currency = course.price?.currency ?? "SAR";
  const duration = course.metadata?.duration ?? 0;
  const modulesCount = course.metadata?.modulesCount ?? 0;
  const avgRatings = course.metadata?.avgRatings ?? 0;
  const ratingsCount = course.metadata?.ratingsCount ?? 0;
  const thumbnail = course.thumbnail;
  const contentTypeLabel = contentTypeLabels[course.contentType] || course.contentType;

  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl pt-0 gap-1 p-4">
      <Link href={`/course/${course._id}`} className="block">
        <Image
          className="w-full object-cover"
          src={thumbnail || course1}
          alt={course.title}
          width={384}
          height={192}
        />
      </Link>
      <CardHeader className="flex-grow px-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="px-5 py-1 rounded-full border-gray-900 border-2 text-sm"
          >
            {contentTypeLabel}
          </Badge>
          <Badge
            variant="outline"
            className="px-5 py-1 rounded-full border-gray-900 border-2 text-sm"
          >
            {course.level === "beginner" ? "مبتدئ" : course.level === "intermediate" ? "متوسط" : course.level === "advanced" ? "متقدم" : course.level}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted-foreground text-base">({ratingsCount})</span>
          <div className="flex items-center gap-2">
            <Rating rating={avgRatings} />
            <span className="text-muted-foreground text-base ml-2">
              {avgRatings.toFixed(1)}
            </span>
          </div>
        </div>

        <CardTitle className="text-lg font-medium truncate">
          {course.title}
        </CardTitle>

        <div className="mt-2 flex items-center gap-2">
          <Link href={`/teacher/${course.instructor || 1}`} className='flex items-center gap-2'>
            <Image
              className="rounded-full bg-gray-100 cursor-pointer"
              src={courseProfile}
              alt="Instructor avatar"
              width={40}
              height={40}
            />
            {/* <p>{course.instructor || "instructor"}</p> */}
            <p>{"instructor"}</p>
          </Link>
        </div>
      </CardHeader> 
      <CardFooter className="pt-2 px-2">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-semibold text-gray-900 flex gap-1 items-center">
            <span>{price}</span>
            <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
          </div>
          <Button
            variant="outline"
            className="px-5 md:px-10 py-6 rounded-full cursor-pointer"
          >
            اشترك الآن
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
