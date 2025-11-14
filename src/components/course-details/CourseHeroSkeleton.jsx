import React from "react";

const CourseHeroSkeleton = () => {
  return (
    <div className="space-y-6 lg:col-span-2 col-span-1 bg-primary px-8 py-5 rounded-lg text-white shadow-lg backdrop-blur-md">
      <div className="space-y-3">
        <div className="w-8 h-8 bg-white/20 animate-pulse rounded ms-auto"></div>

        <div className="space-y-3">
          <div className="h-12 md:h-16 w-full bg-white/20 animate-pulse rounded"></div>
          <div className="h-12 md:h-16 w-3/4 bg-white/20 animate-pulse rounded"></div>
        </div>

        <div className="space-y-2 sm:pe-32">
          <div className="h-6 w-full bg-white/20 animate-pulse rounded"></div>
          <div className="h-6 w-5/6 bg-white/20 animate-pulse rounded"></div>
          <div className="h-6 w-4/6 bg-white/20 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm border-b border-gray-50 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-white/20 animate-pulse rounded"></div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-white/20 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
          <div className="h-4 w-8 bg-white/20 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 animate-pulse rounded-full"></div>
        <div className="h-5 w-32 bg-white/20 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default CourseHeroSkeleton;
