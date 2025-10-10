import React from 'react';
import Link from 'next/link';
import { NavBar } from "@/components/navbar";
import { CourseHero, CourseSidebar } from "@/components/course-page";
import { courseHeroData, courseSidebarData } from '@/data/coursePageData';
import Footer from "@/components/footer";
import { Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoursePage = () => {
    return (
        <div>
            <NavBar />

            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    {/* Header with Title and Breadcrumb Tabs */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 flex-wrap gap-3 border-y py-4 border-gray-200">
                        {/* Title */}
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-right">
                            {courseHeroData.title}
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">0%</div>
                                <p className="text-xs sm:text-sm">تقدمك</p>
                            </div>
                            <Button variant="outline" className="flex items-center gap-1.5">
                                <Star className="w-5 h-5 text-yellow-400"/>
                                <p className="text-xs sm:text-sm">قيم الدورة</p>
                            </Button>
                            <Button variant="outline" className="flex items-center gap-1.5">
                                <Share2 className="w-4 h-4 text-gray-600"/>
                                <p className="text-gray-700 text-xs sm:text-sm">شارك الدورة</p>
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <Card>
                                <CardContent className="p-0">
                                    <CourseHero data={courseHeroData} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <Card>
                                <CardContent>
                                    <CourseSidebar data={courseSidebarData} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CoursePage;
