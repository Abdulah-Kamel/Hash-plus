import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CourseRatings from "@/components/course-page/CourseRatings";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, StarHalf, ThumbsDown, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import CommentInput from "@/components/course-page/CommentInput";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import instructorAvatar from "@/assets/courseProfile.png";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";

const ReviewsTab = () => {
    const isTextArea = true;
    return (
        <TabsContent value="reviews" className="space-y-6">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CourseRatings/>
                    <div className="flex items-center border-b-2 border-gray-200 pb-4">
                        <div className="w-full">
                            <h3 className="text-xl font-bold">تقييم الطلاب</h3>
                            <div className="mt-4 flex items-center justify-between gap-4 w-full">
                                <div className={"flex items-center justify-between gap-4"}>
                                    <Input type={"text"} className="rounded-full px-4 py-6" placeholder={"ابحث هنا"} dir={"rtl"}/>
                                    <Button variant={"outline"} className="rounded-full bg-primary text-white hover:bg-primary/90 p-4 py-6">
                                        <Search className="size-6" />
                                    </Button>
                                </div>
                                <Select dir={"rtl"}>
                                    <SelectTrigger className="py-5 px-8 border-gray-800 rounded-full">
                                        <SelectValue placeholder="ترتيب حسب" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="newest">الاحدث</SelectItem>
                                            <SelectItem value="old">الاقدم</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <CommentInput isTextArea={isTextArea}/>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Review Item */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16 bg-gray-100">
                                    <Image src={instructorAvatar} alt={"instructor image"} objectFit={"cover"}/>
                                </Avatar>
                                <h4 className="text-lg font-semibold">محمد على</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground font-light">منذ 3 اسابيع</p>
                                <div className="flex items-center gap-1">
                                    <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-3 leading-loose">
                            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية
                            <span role={"button"} className="border-none text-secondary ms-2 cursor-pointer">عرض المزيد .</span>
                        </p>
                        <div className="py-4">
                            هل كان التقييم مفيدا؟
                            <ThumbsUp />
                            <ThumbsDown />
                        </div>
                    </div>
                    {/* Review Item */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16 bg-gray-100">
                                    <Image src={instructorAvatar} alt={"instructor image"} objectFit={"cover"}/>
                                </Avatar>
                                <h4 className="text-lg font-semibold">محمد على</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground font-light">منذ 3 اسابيع</p>
                                <div className="flex items-center gap-1">
                                    <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-3 leading-loose">
                            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية
                            <span role={"button"} className="border-none text-secondary ms-2 cursor-pointer">عرض المزيد .</span>
                        </p>
                    </div>
                    {/* Review Item */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16 bg-gray-100">
                                    <Image src={instructorAvatar} alt={"instructor image"} objectFit={"cover"}/>
                                </Avatar>
                                <h4 className="text-lg font-semibold">محمد على</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground font-light">منذ 3 اسابيع</p>
                                <div className="flex items-center gap-1">
                                    <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-3 leading-loose">
                            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية
                            <span role={"button"} className="border-none text-secondary ms-2 cursor-pointer">عرض المزيد .</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default ReviewsTab;
