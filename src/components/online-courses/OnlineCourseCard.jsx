import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Clock, BookOpenText, SaudiRiyal} from 'lucide-react';
import Rating from '../shared/Rating';
import courseProfile from "../../assets/courseProfile.png";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OnlineCourseCard = ({ course }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl shadow-lg p-4 first:z-8 md:first:rotate-z-12 md:last:-rotate-z-12">
      <Link href={`/course`} className="block">
        <Image className="w-full rounded-t-xl object-cover h-48" src={course.image} alt={course.title} width={320} height={192} />
      </Link>
      <CardHeader className="flex-grow px-0">
        {/* Rating Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
          <span className="text-muted-foreground text-base">
            ({course.reviews} )
          </span>
            <Rating rating={course.rating} />
            <span className="text-muted-foreground text-base ms-1">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <CardTitle className="text-xl font-medium">{course.title}</CardTitle>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <Link href={`/teacher/${course.instructorId || 1}`}>
            <Image className="rounded-full bg-gray-100 cursor-pointer" src={courseProfile} alt="Instructor avatar" width={32} height={32} />
          </Link>
          <p className="text-base font-light">{course.instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="border-b pb-2">
        {/* Course Info */}
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <p>{course.duration}</p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <BookOpenText className="w-5 h-5" />
            <p>{course.lessons}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        {/* Price and CTA */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full text-2xl font-semibold text-gray-900 gap-1">
            <span>{course.price}</span>
           <SaudiRiyal className="w-5 h-5"/>
          </div>
            <Button variant="outline" className="px-5 md:px-10 py-6 rounded-full">اضف الى السلة</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OnlineCourseCard;
