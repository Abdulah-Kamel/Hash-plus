import React from 'react';
import {courseHeroData} from "@/data/coursePageData";
import {Share2, Star} from "lucide-react";
import AskAi from "@/components/course-page/AskAi";

const CourseHeader = () => {
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (50 / 100) * circumference
    return (
        <>
            {/* Header with Title and Breadcrumb Tabs */}
            <div className="flex max-sm:flex-col items-center justify-between mb-6 flex-wrap gap-4 border-y p-4 border-gray-200">
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    {courseHeroData.title}
                </h1>

                {/* Action Buttons */}
                <div className="flex items-center max-sm:flex-wrap max-sm:justify-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="relative flex items-center justify-center w-14 h-14">
                            <svg
                                className="rotate-[-90deg]"
                                width="56"
                                height="56"
                                viewBox="0 0 56 56"
                            >
                                {/* Background circle */}
                                <circle
                                    stroke="#E5E7EB"
                                    fill="transparent"
                                    strokeWidth="5"
                                    r={radius}
                                    cx="28"
                                    cy="28"
                                />
                                {/* Progress circle */}
                                <circle
                                    stroke="#6E82F4"
                                    fill="transparent"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    r={radius}
                                    cx="28"
                                    cy="28"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                />
                            </svg>
                        </div>
                        <p className="text-xs sm:text-sm">تقدمك</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Star className="w-8 h-8 text-[#E4E4E7]"/>
                        <p className="text-xs sm:text-sm">قيم الدورة</p>
                    </div>
                    <button className="flex items-center cursor-pointer gap-1.5 px-2 sm:px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 duration-200">
                        <Share2 className="w-4 h-4 text-gray-600"/>
                        <p className="text-gray-700 text-xs sm:text-sm">شارك الدورة</p>
                    </button>
                    <AskAi/>
                </div>
            </div>
        </>
    );
};

export default CourseHeader;