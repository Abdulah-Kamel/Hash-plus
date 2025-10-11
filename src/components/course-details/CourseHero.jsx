import React from 'react';
import { Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import codeIcon from "@/assets/code-circle.svg"
import instrctorAvatar from "@/assets/courseProfile.png"
const CourseHero = ({ course }) => {
  return (
    <div className="space-y-6 lg:col-span-2 col-span-1 bg-primary px-8 py-5 rounded-lg text-white shadow-lg backdrop-blur-md">
        <div className="space-y-3">
            <Image src={codeIcon} alt="course icon" className=" text-white ms-auto"/>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                دورة JavaScript
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed sm:pe-32">
                معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.
            </p>
        </div>

        {/* Course Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm border-b border-gray-50 pb-6">
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <span className="text-blue-200 me-2">(625)</span>

                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <span className="font-medium">4.8</span>
            </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Image src={instrctorAvatar} alt={"instructor image"}/>
            </div>
            <div>
                <p className="font-medium">ولاء القحطاني</p>
            </div>
        </div>
    </div>
  );
};

export default CourseHero;
