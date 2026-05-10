"use client"
import React, { useState } from 'react';
import {Search, Filter, Play, Clock, Users, Star, CalendarDays, SaudiRiyal, BookOpenText} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Rating} from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import courseProfile from "@/assets/courseProfile.png";
import course1 from "@/assets/course1.png"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { getMyLearning } from "@/actions/learningActions";
import { Loader2 } from "lucide-react";

const LibraryContent = () => {
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (50 / 100) * circumference
    const [activeTab, setActiveTab] = useState('التعليم');
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchLearning = async () => {
            setLoading(true);
            const res = await getMyLearning();
            if (res.success) {
                console.log("res:", res);
                
                setCourses(res.data?.data || []);
            }
            setLoading(false);
        };
        fetchLearning();
    }, []);
    const tabs = ['التعليم','الشهادات'];

    const filteredCourses = courses.filter(item => {
        const course = item.content || item.contentId || item;
        const matchesTab = activeTab === 'التعليم' || course.status === activeTab;
        const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const CourseCard = ({ item }) => {
        const course = item.content || item.contentId || item;
        const progress = item.progress || 0;
        
        return (
        <Card className="w-full rounded-2xl p-0">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                {/* Course Image */}
                <Link href={`/course-page/${course._id}`} className="block flex-shrink-0">
                    <Image className="w-full xl:w-64 h-full object-cover rounded-lg" src={course.thumbnail?.url || course.image || course1} alt={course.title || "Course"} width={192} height={128} />
                </Link>

                {/* Course Content - arranged horizontally */}
                <div className="flex flex-col xl:flex-row flex-grow justify-between items-center gap-6">
                    {/* Left Section - Course Info */}
                    <div className="flex-grow w-full space-y-3">
                        <div className="flex max-xl:flex-col gap-3 items-center justify-between">
                            {/* tags section */}
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="px-3 py-1 rounded-full border-gray-900 border-1 text-xs">
                                    {course.contentType === "bootcamp" ? "معسكر" : "دورة"}
                                </Badge>
                                {(course.category?.name || course.category) && (
                                <Badge variant="outline" className="px-3 py-1 rounded-full border-gray-900 border-1 text-xs">
                                    {course.category?.name || "برمجة"}
                                </Badge>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium">{course.title}</h3>

                        {/* Instructor */}
                        <div className="flex items-center gap-2">
                            <Link href={`/teacher/${course.instructor?._id || course.instructorId || 1}`}>
                                <Image className="rounded-full bg-gray-100 cursor-pointer" src={courseProfile} alt="Instructor avatar" width={32} height={32} />
                            </Link>
                            <p className="text-base font-light">{course.instructor?.name || course.instructor || "ولاء القحطاني"}</p>
                        </div>
                        <div className="space-y-2 mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                                <div 
                                    className="bg-primary h-1 rounded-full transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="text-sm font-medium">التقدم</span>
                                <span className="text-sm font-bold">{progress}%</span>
                            </div>
                        </div>
                        {/* Price and CTA */}
                        <div className="flex items-center justify-between w-full">
                            <Link href={`/course-page/${course._id}`} className="w-full">
                                <Button variant="outline" className="rounded-full cursor-pointer max-xl:text-sm px-3 xl:px-8 py-4 w-full">اكمل التعلم</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )};

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex  gap-2 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-10 lg:px-20 py-2 text-sm font-medium transition-all duration-200 border-b-3 ${
                            activeTab === tab
                                ? ' border-primary'
                                : 'border-transparent text-muted-foreground'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-col-1 gap-4 lg:grid-cols-4">
                <div className="col-span-2">
                    <div className="flex items-center justify-between">
                        <Badge variant={"outline"} className="bg-white p-3 rounded-full ">
                            ابريل
                            <CalendarDays className="size-6 mr-1" />
                        </Badge>
                </div>
                <div className="mt-4">
                    <h2 className="text-3xl">احصائيات تعلمك</h2>
                    <p className="text-muted-foreground mt-2">1 ابريل - 30 ابريل</p>
                </div>
                </div>
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-center items-center mt-4">
                    <div className="space-y-4 max-lg:order-2">
                        <div className="border-b pb-2 border-b-gray-300 ">
                            <div className="flex items-center justify-between border-r-3 px-3 border-r-primary">
                                <span>دورات</span>
                                <span className="text-muted-foreground">24%</span>
                            </div>
                        </div>
                        <div className="border-b pb-2 border-b-gray-300 ">
                            <div className="flex items-center justify-between border-r-3 px-3 border-r-teal-300">
                                <span>دورات</span>
                                <span className="text-muted-foreground">24%</span>
                            </div>
                        </div>
                        <div className="border-b pb-2 border-b-gray-300 ">
                            <div className="flex items-center justify-between border-r-3 px-3 border-r-secondary">
                                <span>دورات</span>
                                <span className="text-muted-foreground">24%</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center max-lg:order-1">
                        <div className="relative w-54 h-54">
                            <svg
                                className="w-54 h-54 transform -rotate-90"
                                viewBox="0 0 120 120"
                            >
                                {/* Outer ring - Blue (68%) */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    stroke="#6366F1"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 60}`}
                                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - 0.68)}`}
                                    className="transition-all duration-1000"
                                />
                                
                                {/* Middle ring - Purple (45%) */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="38"
                                    stroke="#A855F7"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 50}`}
                                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.45)}`}
                                    className="transition-all duration-1000 delay-200"
                                />
                                
                                {/* Inner ring - Teal (24%) */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="26"
                                    stroke="#14B8A6"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 35}`}
                                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.24)}`}
                                    className="transition-all duration-1000 delay-400"
                                />
                            </svg>
                            
                            {/* Center text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">16%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <h3 className="text-lg font-semibold">المحتوى</h3>
                <div className="mt-4 flex items-center justify-between gap-4 w-full">
                    <div className={"flex items-center justify-between gap-4"}>
                        <Input type={"text"} className="rounded-full px-4 py-6" placeholder={"ابحث هنا"} dir={"rtl"}/>
                        <Button variant={"outline"} className="rounded-full bg-primary text-white hover:bg-primary/90 p-4 py-6">
                            <Search className="size-6" />
                        </Button>
                    </div>
                   <div className="flex items-center gap-2">
                       <Select dir={"rtl"}>
                           <SelectTrigger className="py-5 px-8 border-gray-800 rounded-full">
                               <SelectValue placeholder="الفئه" />
                           </SelectTrigger>
                           <SelectContent>
                               <SelectGroup>
                                   <SelectItem value="course">دورة</SelectItem>
                                   <SelectItem value="note">مذكرة</SelectItem>
                               </SelectGroup>
                           </SelectContent>
                       </Select>
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
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        {loading ? (
                            <div className="col-span-2 flex justify-center py-10">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            filteredCourses.map((item, index) => (
                                <CourseCard key={item._id || index} item={item} />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-10 text-gray-500">
                                لا يوجد محتوى متاح حاليا
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryContent;
