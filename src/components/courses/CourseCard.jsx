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

const CourseCard = ({ course }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl pt-0 gap-2 p-4">
      <Link href={`/course`} className="block">
        <Image className="w-full object-cover" src={course.image} alt={course.title} width={384} height={192} />
      </Link>
      <CardHeader className="flex-grow">
        {/* tags section */}
          <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="px-5 py-1 rounded-full border-gray-900 border-2  text-sm">
                  دورة
              </Badge>
              <Badge variant="outline" className="px-5 py-1 rounded-full border-gray-900 border-2  text-sm">
                  برمجة
              </Badge>
          </div>
        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground text-base">
            ({course.reviews})
          </span>
          <div className="flex items-center gap-2">
            <Rating rating={course.rating} />
            <span className="text-muted-foreground text-base ml-2">
              {course.rating.toFixed(1)}
            </span>
          </div>

        </div>

        {/* Title */}
        <CardTitle className="text-xl lg:text-2xl font-medium">{course.title}</CardTitle>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <Link href={`/teacher/${course.instructorId || 1}`}>
            <Image className="rounded-full bg-gray-100 cursor-pointer" src={courseProfile} alt="Instructor avatar" width={40} height={40} />
          </Link>
          <p className="text-lg font-light">{course.instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="border-b mx-5 py-4 text-lg">
        {/* Course Info */}
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-6 h-6" />
            <p>{course.duration}</p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <BookOpenText className="w-6 h-6" />
            <p>{course.lessons} درس</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6 px-4">
        {/* Price and CTA */}
        <div className="flex items-center justify-between w-full">
          <div className="text-3xl font-semibold text-gray-900 flex gap-1 items-center">
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
