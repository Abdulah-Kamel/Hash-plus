"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatorTopBar from "@/components/creator/CreatorTopBar";
import { useAuth } from "@/hooks/useAuth";
import { getAllContents } from "@/actions/contentActions";
import {
  Loader2,
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Helper to determine progress based on filled fields
const calculateProgress = (course) => {
  let filled = 0;
  const total = 5;
  if (course.title && course.title.trim() !== "") filled++;
  if (course.thumbnail) filled++;
  if (course.price !== undefined && course.price !== null) filled++;
  if (course.sections && course.sections.length > 0) filled++;
  if (course.welcomeVideo || course.welcomeMessage || course.description)
    filled++;

  return Math.round((filled / total) * 100);
};

export default function CoursesPage() {
  const [allContents, setAllContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("course");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMyContents = async () => {
      const userId = user?._id || user?.id;
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const res = await getAllContents();
      if (res.success) {
        const list =
          res.data?.data?.contents || res.data?.data || res.data || [];

        // Filter all user contents
        const userContents = Array.isArray(list)
          ? list.filter(
              (c) =>
                c.instructor === userId ||
                c.instructor?._id === userId ||
                c.instructor?.id === userId,
            )
          : [];

        setAllContents(userContents);

        // Auto-select tab if user only has bootcamps
        if (
          userContents.length > 0 &&
          !userContents.some((c) => c.contentType === "course")
        ) {
          if (userContents.some((c) => c.contentType === "bootcamp")) {
            setActiveTab("bootcamp");
          }
        }
      }
      setIsLoading(false);
    };

    if (!authLoading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      fetchMyContents();
    }
  }, [user, authLoading, router]);

  const tabs = [
    { id: "course", label: "الدورات" },
    { id: "note", label: "المذكرات" },
    { id: "bootcamp", label: "المعسكرات" },
  ];

  const displayedContents = allContents.filter(
    (c) => c.contentType === activeTab,
  );

  return (
    <>
      <CreatorTopBar title="المحتوى" />
      <div className="mt-6 px-4 mx-auto" dir="rtl">
        {isLoading || authLoading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Top Controls: Tabs and Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center bg-gray-100/80 p-1.5 rounded-full border border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Select defaultValue="newest" dir="rtl">
                  <SelectTrigger className="w-[120px] bg-white rounded-full h-10 border-gray-200 text-gray-700 font-medium px-4">
                    <SelectValue placeholder="الترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="oldest">الأقدم</SelectItem>
                    <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  </SelectContent>
                </Select>

                <Link href="/creator/onbording">
                  <Button className="rounded-full px-6 flex gap-2 w-auto bg-primary text-white hover:bg-primary/90 h-10 shadow-sm">
                    <Plus className="w-4 h-4" />
                    إنشاء محتوى جديد
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content List */}
            {displayedContents.length === 0 ? (
              <div className="text-center p-20 bg-white rounded-3xl border border-gray-100 mt-4">
                <p className="text-xl font-medium text-gray-500">
                  لا يوجد محتوى في هذا القسم حالياً.
                </p>
                <Link href="/creator/onbording" className="inline-block mt-4">
                  <Button className="rounded-full px-8 py-3 text-lg bg-primary hover:bg-primary/90 shadow-md">
                    إنشاء محتوى جديد
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pb-10">
                {displayedContents.map((course) => {
                  const progress = calculateProgress(course);
                  const isAvailable = progress >= 100;
                  const thumbUrl = course.thumbnail?.url || null;
                  const price = course.price?.amount || 0;
                  const students = course.metadata?.totalStudentsEnrolled || 0;
                  const rating = course.metadata?.avgRatings || 0;
                  // Dummy profit logic for UI purposes if real profit isn't available per course
                  const profit = price * students || 0;

                  return (
                    <div
                      key={course._id}
                      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Right Section: Image & Title */}
                      <div className="flex items-center gap-4 w-full md:w-1/3">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center">
                          {thumbUrl ? (
                            <Image
                              src={thumbUrl}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                            {course.title}
                          </h3>
                          {isAvailable ? (
                            <span className="px-3 py-0.5 bg-purple-100 text-primary text-xs font-bold rounded-full">
                              مكتمل
                            </span>
                          ) : (
                            <span className="px-3 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">
                              لم يكتمل
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle Section: Stats or Progress */}
                      <div className="flex items-center justify-center w-full md:w-1/3">
                        {isAvailable ? (
                          <div className="flex items-center justify-between w-full max-w-sm px-4">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-gray-900 font-bold text-lg">
                                {students}
                              </span>
                              <span className="text-gray-500 text-xs font-medium">
                                عدد الطلبة
                              </span>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100"></div>
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-gray-900 font-bold text-lg flex items-baseline gap-1">
                                {profit}{" "}
                                <span className="text-xs font-medium text-gray-500">
                                  ريال
                                </span>
                              </span>
                              <span className="text-gray-500 text-xs font-medium">
                                الربح
                              </span>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100"></div>
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-gray-900 font-bold text-lg flex items-center gap-1">
                                {rating > 0 ? rating.toFixed(1) : "0.0"}{" "}
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              </span>
                              <span className="text-gray-500 text-xs font-medium">
                                التقييم
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 w-full max-w-md px-4">
                            <span className="text-gray-900 font-bold text-sm w-10 text-left">
                              {progress}%
                            </span>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="bg-primary/60 h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Left Section: Actions */}
                      <div className="flex items-center justify-end gap-6 w-full md:w-1/3">
                        {isAvailable ? (
                          <>
                            <Link
                              href={`/course-page/${course._id}`}
                              className="text-blue-500 hover:text-blue-600 font-bold text-sm underline-offset-4 hover:underline transition-all"
                            >
                              عرض المحتوى
                            </Link>
                            <Link
                              href={`/creator/content/${course._id}`}
                              className="text-primary hover:text-primary/80 font-bold text-sm underline-offset-4 hover:underline transition-all"
                            >
                              تعديل
                            </Link>
                          </>
                        ) : (
                          <Link
                            href={`/creator/content/${course._id}`}
                            className="text-blue-500 hover:text-blue-600 font-bold text-sm underline-offset-4 hover:underline transition-all"
                          >
                            أكمل المحتوى
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Pagination */}
                {displayedContents.length > 0 && (
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-medium text-sm">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">
                      3
                    </button>
                    <span className="text-gray-400 tracking-widest px-1">
                      ...
                    </span>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">
                      10
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
