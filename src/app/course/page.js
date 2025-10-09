import React from 'react';
import Link from 'next/link';
import { NavBar } from "@/components/navbar";
import { CourseHero, CourseSidebar } from "@/components/course-page";
import { courseHeroData, courseSidebarData } from '@/data/coursePageData';
import Footer from "@/components/footer";
import {Star, Share2} from "lucide-react";

const CoursePage = () => {
    return (
        <div>
            <NavBar />

            <div className="bg-white min-h-screen">
                <div className="px-4 lg:px-8 py-4">
                    {/* Header with Title and Breadcrumb Tabs */}
                    <div className="flex max-sm:flex-col items-center justify-between mb-6 flex-wrap gap-3 border-y py-4 border-gray-200">
                        {/* Title */}
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            {courseHeroData.title}
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">0%</div>
                                <p className="text-xs sm:text-sm">تقدمك</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Star className="w-8 h-8 text-[#E4E4E7]"/>
                                <p className="text-xs sm:text-sm">قيم الدورة</p>
                            </div>
                            <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 duration-200">
                                <Share2 className="w-4 h-4 text-gray-600"/>
                                <p className="text-gray-700 text-xs sm:text-sm">شارك الدورة</p>
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                            {/* Main Content - 3 parts (60%) */}
                            <div className="lg:col-span-3">
                                <CourseHero data={courseHeroData} />
                            </div>

                            {/* Sidebar - 2 parts (40%) */}
                            <div className="lg:col-span-2">
                                <CourseSidebar data={courseSidebarData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CoursePage;