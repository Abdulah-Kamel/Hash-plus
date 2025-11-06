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

const CourseCard = ({ course }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl pt-0 gap-1 p-4">
      <Link href={`/course/${course.id}`} className="block">
        <Image className="w-full object-cover" src={course1} alt={course.title} width={384} height={192} />
      </Link>
      <CardHeader className="flex-grow px-0">
        {/* tags section */}
          <div className="flex items-center gap-2 mb-2">
            {course.tags.slice(0, 2).map((tag)=>(
              <Badge variant="outline" className="px-5 py-1 rounded-full border-gray-900 border-2  text-sm" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground text-base">
            (625)
          </span>
          <div className="flex items-center gap-2">
            <Rating rating={4.5} />
            <span className="text-muted-foreground text-base ml-2">
              {4.5.toFixed(1)}
            </span>
          </div>

        </div>

        {/* Title */}
        <CardTitle className="text-xl lg:text-xl font-medium">{course.title}</CardTitle>

        {/* Instructor */}
        <div className="mt-2 flex items-center gap-2">
          <Link href={`/teacher/${course.instructorId || 1}`}>
            <Image className="rounded-full bg-gray-100 cursor-pointer" src={courseProfile} alt="Instructor avatar" width={40} height={40} />
          </Link>
          <p className="text-lg font-light">{course.createdBy.name}</p>
        </div>
      </CardHeader>
      <CardContent className="border-b mx-2 py-4 text-lg">
        {/* Course Info */}
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-6 h-6" />
            <p>{course.duration} ساعة</p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <BookOpenText className="w-6 h-6" />
            <p>{course.totalModules || 40} درس</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 px-2">
        {/* Price and CTA */}
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-semibold text-gray-900 flex gap-1 items-center">
            <span>{course.price}</span>
            <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
          </div>
          <Button variant="outline" className="px-5 md:px-10 py-6 rounded-full">اضف الى السلة</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
