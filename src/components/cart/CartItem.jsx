import React from 'react';
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Rating} from "@/components/shared";
import courseProfile from "@/assets/courseProfile.png";
import saRyal from "@/assets/saRyal.svg";
import { BookOpenText, Clock, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const CartItem = ({course}) => {
    return (
        <Card className="w-full rounded-2xl p-0" key={course.id}>
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                {/* Course Image */}
                <Link href={`/course`} className="block flex-shrink-0">
                    <Image
                        className="w-full lg:w-64 h-full object-cover rounded-lg"
                        src={course.image}
                        alt={course.title}
                        width={192}
                        height={128}
                    />
                </Link>

                {/* Course Content - arranged horizontally */}
                <div className="flex flex-col lg:flex-row flex-grow justify-between items-center gap-6">
                    {/* Left Section - Course Info */}
                    <div className="flex-grow w-full space-y-3">
                        <div className="flex max-lg:flex-col gap-3 items-center justify-between">
                            {/* tags section */}
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="px-3 py-1 rounded-full border-gray-900 border text-xs"
                                >
                                    دورة
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="px-3 py-1 rounded-full border-gray-900 border text-xs"
                                >
                                    برمجة
                                </Badge>
                            </div>
                            <div>
                                <Button
                                    variant={"outline"}
                                    className="text-red-500  hover:bg-red-500 hover:text-white transition-colors cursor-pointer border-red-500 rounded-full p-6"

                                >
                                    <Trash className="size-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium">{course.title}</h3>
                        {/* Rating Section */}
                        <div className="flex items-center gap-2">
                            <div>
                                <Badge
                                    variant={"outline"}
                                    className="bg-secondary text-xs text-white px-4 py-1 rounded-full"
                                >
                                    الاعلى تقييم
                                </Badge>
                            </div>
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
                        {/* Instructor */}
                        <div className="flex items-center gap-2">
                            <Link href={`/teacher/${course.instructorId || 1}`}>
                                <Image
                                    className="rounded-full bg-gray-100 cursor-pointer"
                                    src={courseProfile}
                                    alt="Instructor avatar"
                                    width={32}
                                    height={32}
                                />
                            </Link>
                            <p className="text-base font-light">
                                {course.instructor}
                            </p>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between w-full">
                            {/* Course Info */}
                            <div className="flex items-center gap-4 text-sm">
                                <div className="text-muted-foreground flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <p>{course.duration}</p>
                                </div>
                                <div className="text-muted-foreground flex items-center gap-2">
                                    <BookOpenText className="w-5 h-5" />
                                    <p>{course.lessons} درس</p>
                                </div>
                            </div>
                            <div className="text-3xl font-semibold text-gray-900 flex gap-1 items-center">
                                <span>{course.price}</span>
                                <Image
                                    src={saRyal}
                                    alt="سعر الدورة"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CartItem;