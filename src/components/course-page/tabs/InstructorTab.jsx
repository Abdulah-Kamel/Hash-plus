import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import instructorAvatar from "@/assets/courseProfile.png";
import {BookHeart, ChevronDown, GraduationCap, SquarePlay, Star} from "lucide-react";
import { Button } from "@/components/ui/button";
import {coursesData} from "@/data/coursesData";
import HorizontalCourseCard from "@/components/course-details/HorizontalCourseCard";
import {TabsContent} from "@/components/ui/tabs";
import React from "react";
const InstructorTab = () => {

    return (
        <TabsContent value="instructor" className="space-y-6">
            <Card className="border-none shadow-none">
                <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">ولاء القحطاني</h3>
                                <p className="text-muted-foreground mt-1">مبرمجه</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-22 h-22 bg-gray-100 mt-2">
                                    <Image src={instructorAvatar} alt={"instructor image"} objectFit={"cover"}/>
                                </Avatar>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center text-muted-foreground gap-2">
                                        <Star />
                                        <span>4.6 تقييم المعلم</span>
                                    </li>
                                    <li className="flex items-center text-muted-foreground gap-2">
                                        <BookHeart />
                                        <span>4.6 تقييم المعلم</span>
                                    </li>
                                    <li className="flex items-center text-muted-foreground gap-2">
                                        <GraduationCap />
                                        <span>4.6 تقييم المعلم</span>
                                    </li>
                                    <li className="flex items-center text-muted-foreground gap-2">
                                        <SquarePlay />
                                        <span>4.6 تقييم المعلم</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mt-6 text-lg font-bold">عن المعلم</h4>
                                <p>معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.</p>
                                <div className="mt-3">
                                    <Button variant={"ghost"} className="bg-gray-50 text-secondary hover:text-secondary py-4 px-12" >
                                        عرض المزيد
                                        <ChevronDown/>
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                                <h3 className="text-xl font-bold">دورات لها علاقة</h3>
                                {
                                    coursesData.slice(0,3).map((course)=>(
                                        <HorizontalCourseCard key={course.id} course={course} isHorizontal={true}/>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default InstructorTab;
