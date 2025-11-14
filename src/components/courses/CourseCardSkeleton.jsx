import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const CourseCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-2xl pt-0 gap-1 p-4">
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>

      <CardHeader className="flex-grow px-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
            <div className="h-4 w-8 bg-gray-200 animate-pulse rounded ml-2"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </CardHeader>

      <CardContent className="border-b mx-2 py-4 text-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 px-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 items-center">
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCardSkeleton;
