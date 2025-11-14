import React from "react";

const CourseSidebarSkeleton = () => {
  return (
    <div className="p-4 sticky top-24">
      <div className="text-right mb-4">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="space-y-2">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="p-3 flex items-center gap-2 border border-gray-200 rounded-lg"
          >
            <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full flex-shrink-0"></div>

            <div className="flex-1 text-right space-y-1">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="h-3 w-12 bg-gray-200 animate-pulse rounded"></div>

            <div className="w-4 h-4 bg-gray-200 animate-pulse rounded flex-shrink-0"></div>

            {index % 3 === 0 && (
              <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-full flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-3">
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-2 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebarSkeleton;
