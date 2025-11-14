import React from "react";

const CourseHeaderSkeleton = () => {
  return (
    <div className="flex max-sm:flex-col items-center justify-between mb-6 flex-wrap gap-4 border-y p-4 border-gray-200">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>

      <div className="flex items-center max-sm:flex-wrap max-sm:justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-14 h-14 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg">
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

export default CourseHeaderSkeleton;
