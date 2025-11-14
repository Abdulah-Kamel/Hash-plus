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

const HorizontalCourseCard = ({ course }) => {
    return (
      <Card className="w-full rounded-2xl p-0">
        <div className="flex flex-col xl:flex-row gap-4 p-4">
          <Link href={`/course/${course?.id}`} className="block flex-shrink-0">
            <Image
              className="w-full xl:w-64 h-full object-cover rounded-lg"
              src={course1}
              alt={course.title}
              width={192}
              height={128}
            />
          </Link>

          <div className="flex flex-col xl:flex-row flex-grow justify-between items-center gap-6">
            <div className="flex-grow w-full space-y-3">
              <div className="flex max-xl:flex-col gap-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  {course?.tags?.map((tag) => (
                    <Badge
                      variant="outline"
                      className="px-3 py-1 rounded-full border-gray-900 border-1 text-xs"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    ({course?.stats?.totalRatings})
                  </span>
                  <div className="flex items-center gap-1">
                    <Rating rating={course?.stats?.averageRating || 4.5} />
                    <span className="text-muted-foreground text-sm">
                      {course?.stats?.averageRating || 4.5}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium">{course?.title}</h3>

              <div className="flex items-center gap-2">
                <Link href={`/teacher/${course?.createdBy?.id}`}>
                  <Image
                    className="rounded-full bg-gray-100 cursor-pointer"
                    src={courseProfile}
                    alt="Instructor avatar"
                    width={32}
                    height={32}
                  />
                </Link>
                <p className="text-base font-light">{course?.createdBy?.name}</p>
              </div>
              <div className="flex items-center gap-4 xl:gap-50 border-b mx-2 xl:mx-5 pb-4 mt-3 text-base xl:text-lg">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <p>{course?.duration} ساعة</p>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <BookOpenText className="w-6 h-6" />
                  <p>{course?.totalModules} درس</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl font-medium text-gray-900 flex gap-1 items-center">
                  <span>{course?.price}</span>
                  <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
                </div>
                <Button
                  variant="outline"
                  className="rounded-full max-xl:text-sm px-3 xl:px-8 py-4"
                >
                  اضف الى السلة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
};

export default HorizontalCourseCard;
