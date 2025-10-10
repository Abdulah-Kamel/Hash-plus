import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpenText } from 'lucide-react';
import Rating from '../shared/Rating';
import courseProfile from "../../assets/courseProfile.png";
import saRyal from "../../assets/saRyal.svg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourseCard = ({ course }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl">
      <Link href={`/courses/${course.id}`} className="block">
        <Image className="w-full rounded-t-xl object-cover h-48" src={course.image} alt={course.title} width={384} height={192} />
      </Link>
      <CardHeader className="flex-grow">
        {/* Rating Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Rating rating={course.rating} />
            <span className="text-muted-foreground text-base ml-2">
              {course.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-muted-foreground text-base">
            ({course.reviews} مراجعات)
          </span>
        </div>

        {/* Title */}
        <CardTitle className="text-2xl font-medium">{course.title}</CardTitle>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <Image className="rounded-full bg-gray-100" src={courseProfile} alt="Instructor avatar" width={32} height={32} />
          <p className="text-base font-light">{course.instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="border-y py-4">
        {/* Course Info */}
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <p>{course.duration}</p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <BookOpenText className="w-5 h-5" />
            <p>{course.lessons} درس</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        {/* Price and CTA */}
        <div className="flex items-center justify-between w-full">
          <div className="text-3xl font-semibold text-gray-900 flex gap-1 items-center">
            <span>{course.price}</span>
            <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
          </div>
          <Button variant="outline">اضف الى السلة</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
