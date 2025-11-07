import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseContentSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card className="px-6">
        <Tabs defaultValue="curriculum" className="w-full" dir="rtl">
          {/* Tabs Header Skeleton */}
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="curriculum"
              className="data-[state=active]:text-primary"
            >
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="data-[state=active]:text-primary"
            >
              <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:text-primary"
            >
              <div className="h-5 w-18 bg-gray-200 animate-pulse rounded"></div>
            </TabsTrigger>
          </TabsList>

          {/* Curriculum Tab Skeleton */}
          <TabsContent value="curriculum" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardHeader>
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
              </CardHeader>
              <CardContent>
                {/* What You Will Learn Section */}
                <Card className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-5 mt-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-start items-center gap-2"
                    >
                      <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </Card>

                {/* Course Content Section */}
                <div className="mt-6">
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-64 bg-gray-200 animate-pulse rounded mt-3"></div>

                  {/* Accordion Skeleton */}
                  <div className="w-full mt-3 border-2 rounded-lg">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-b last:border-b-0">
                        {/* Accordion Header */}
                        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">
                          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                        </div>

                        {/* Accordion Content (only show for first item) */}
                        {i === 0 && (
                          <div className="flex flex-col gap-6 p-4">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="flex justify-between items-center"
                              >
                                <div className="flex items-center gap-1">
                                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded ms-3"></div>
                                </div>
                                <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
                  <div className="mt-3 space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Courses Section */}
                <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                  <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-24 h-16 bg-gray-200 animate-pulse rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                <div className="mt-6">
                  <div className="w-full h-12 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructor Tab Skeleton */}
          <TabsContent value="instructor" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-start w-full">
                    {/* Instructor Header */}
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-22 h-22 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>

                    {/* Instructor Stats */}
                    <div className="mt-4 space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* About Instructor */}
                    <div className="mt-6 w-full">
                      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                      <div className="mt-3 space-y-2">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 w-full bg-gray-200 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="h-12 w-32 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>

                    {/* Related Courses */}
                    <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                      <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-4 border rounded-lg"
                        >
                          <div className="w-24 h-16 bg-gray-200 animate-pulse rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab Skeleton */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <div
                              key={j}
                              className="w-4 h-4 bg-gray-200 animate-pulse rounded"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="h-4 w-full bg-gray-200 animate-pulse rounded"
                        ></div>
                      ))}
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CourseContentSkeleton;
