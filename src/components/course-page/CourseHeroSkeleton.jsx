import React from "react";

const CourseHeroSkeleton = () => {
  return (
    <div className="">
      <div className="px-2 lg:px-4 py-4">
        <div className="mx-auto">
          <div className="relative w-full aspect-video bg-gray-200 animate-pulse rounded-lg mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex border-b border-gray-200">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="h-12 flex items-center justify-center">
                    <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 animate-pulse rounded"
                    ></div>
                  ))}
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-8 w-12 bg-gray-200 animate-pulse rounded mx-auto"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mx-auto"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeroSkeleton;
