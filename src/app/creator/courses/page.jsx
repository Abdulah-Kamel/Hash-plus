"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatorTopBar from "@/components/creator/CreatorTopBar";
import { useAuth } from "@/hooks/useAuth";
import { getAllContents } from "@/actions/contentActions";
import CreatorContentCard from "@/components/creator/CreatorContentCard";
import { Loader2, Plus } from "lucide-react";

export default function CoursesPage() {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchMyContents = async () => {
      const userId = user?._id;
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const res = await getAllContents();
      if (res.success) {
        console.log("Fetched contents response:", res.data);
        const list = res.data?.data;
        console.log("list", list);

        // Filter the requested contents locally inside the browser
        const filteredList = Array.isArray(list)
          ? list.filter(
              (c) =>
                c.instructor === userId ||
                c.instructor?._id === userId ||
                c.instructor?.id === userId,
            )
          : [];

        setContents(filteredList);
      }
      setIsLoading(false);
    };

    if (!authLoading) {
      fetchMyContents();
    }
  }, [user, authLoading]);

  return (
    <>
      <CreatorTopBar title="المحتوى" />
      <div className="mt-8 px-4 lg:px-8">
        {isLoading || authLoading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-6" dir="rtl">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                جميع المحتوى الخاص بك
              </h2>
              <Link href="/creator/onbording">
                <Button className="rounded-full px-6 flex gap-2 w-auto bg-primary text-white hover:bg-primary/90">
                  <Plus className="w-5 h-5" />
                  إنشاء دورة جديدة
                </Button>
              </Link>
            </div>

            {contents.length === 0 ? (
              <div className="text-center p-20 bg-white rounded-2xl border border-gray-100 mt-4">
                <p className="text-xl font-medium text-gray-500">
                  لا يوجد محتوى حالياً.
                </p>
                <Link href="/creator/onbording" className="inline-block mt-4">
                  <Button className="rounded-full px-8 py-6 text-lg hover:bg-primary/90">
                    ابدأ بإنشاء محتواك الأول
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {contents.map((course) => (
                  <CreatorContentCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
