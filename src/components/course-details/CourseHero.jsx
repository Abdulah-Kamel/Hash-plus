import React from 'react';
import { Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import codeIcon from "@/assets/code-circle.svg"
import instrctorAvatar from "@/assets/courseProfile.png"
const CourseHero = ({ courseDetails }) => {
  const ratingsCount = courseDetails?.metadata?.ratingsCount ?? 0;
  const avgRatings = courseDetails?.metadata?.avgRatings ?? 0;

  return (
    <div className="space-y-6 lg:col-span-2 col-span-1 bg-primary px-8 py-5 rounded-lg text-white shadow-lg backdrop-blur-md">
      <div className="space-y-3">
        <Image
          src={codeIcon}
          alt="course icon"
          className=" text-white ms-auto"
        />

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {courseDetails?.title}
        </h1>

        <p className="text-lg text-blue-100 leading-relaxed sm:pe-32">
          {courseDetails?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm border-b border-gray-50 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-blue-200 me-2">
              ({ratingsCount})
            </span>

            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(avgRatings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <span className="font-medium">
            {avgRatings.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Image src={instrctorAvatar} alt={"instructor image"} />
        </div>
        <div>
          <p className="font-medium">{courseDetails?.instructor}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
