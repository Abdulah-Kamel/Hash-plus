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

const HorizontalCourseCard = ({ course }) => {
    return (
        <Card className="w-full rounded-2xl p-0">
            <div className="flex flex-col xl:flex-row gap-4 p-4">
                {/* Course Image */}
                <Link href={`/course`} className="block flex-shrink-0">
                    <Image className="w-full xl:w-64 h-full object-cover rounded-lg" src={course.image} alt={course.title} width={192} height={128} />
                </Link>
                
                {/* Course Content - arranged horizontally */}
                <div className="flex flex-col xl:flex-row flex-grow justify-between items-center gap-6">
                    {/* Left Section - Course Info */}
                    <div className="flex-grow w-full space-y-3">
                        <div className="flex max-xl:flex-col gap-3 items-center justify-between">
                            {/* tags section */}
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="px-3 py-1 rounded-full border-gray-900 border-2 text-xs">
                                    دورة
                                </Badge>
                                <Badge variant="outline" className="px-3 py-1 rounded-full border-gray-900 border-2 text-xs">
                                    برمجة
                                </Badge>
                            </div>
                            {/* Rating Section */}
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-sm">
                                    ({course.reviews})
                                </span>
                                <div className="flex items-center gap-1">
                                    <Rating rating={course.rating} />
                                    <span className="text-muted-foreground text-sm">
                                        {course.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium">{course.title}</h3>

                        {/* Instructor */}
                        <div className="flex items-center gap-2">
                            <Link href={`/teacher/${course.instructorId || 1}`}>
                                <Image className="rounded-full bg-gray-100 cursor-pointer" src={courseProfile} alt="Instructor avatar" width={32} height={32} />
                            </Link>
                            <p className="text-base font-light">{course.instructor}</p>
                        </div>
                        {/* Course Info */}
                        <div className="flex items-center gap-4 xl:gap-50 border-b mx-2 xl:mx-5 pb-4 mt-3 text-base xl:text-lg">
                            <div className="text-muted-foreground flex items-center gap-2">
                                <Clock className="w-6 h-6" />
                                <p>{course.duration}</p>
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2">
                                <BookOpenText className="w-6 h-6" />
                                <p>{course.lessons} درس</p>
                            </div>
                        </div>
                        {/* Price and CTA */}
                        <div className="flex items-center justify-between w-full">
                            <div className="text-3xl font-semibold text-gray-900 flex gap-1 items-center">
                                <span>{course.price}</span>
                                <Image src={saRyal} alt="سعر الدورة" width={24} height={24} />
                            </div>
                            <Button variant="outline" className="rounded-full max-xl:text-sm px-3 xl:px-8 py-4">اضف الى السلة</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HorizontalCourseCard;
