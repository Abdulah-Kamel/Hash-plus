"use client";
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import CategoryHeader from './CategoryHeader';
import { Card, CardContent } from "@/components/ui/card";
import { getAllContents } from '@/actions/contentActions';
import course_icon1 from "@/assets/course_icon1.svg";
import course_icon2 from "@/assets/course_icon2.svg";
import course_icon3 from "@/assets/course_icon3.svg";

// Fallback icons for content types
const contentIcons = [course_icon1, course_icon2, course_icon3];
const contentBgColors = ['bg-primary', 'bg-none', 'bg-none'];

const Categories = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      const res = await getAllContents();
      if (res.success) {
        const data = res.data.data || [];
        // Map API content to category card format
        const mapped = data.map((item, index) => ({
          id: item._id,
          title: item.name,
          description: `استكشف محتوى ${item.name}`,
          icon: contentIcons[index % contentIcons.length],
          bgColor: contentBgColors[index % contentBgColors.length],
        }));
        setContents(mapped);
      }
      setLoading(false);
    };
    fetchContents();
  }, []);

  // Fallback to static data while loading or if API fails
  const fallbackData = [
    { id: 1, title: 'الدورات التعليمية', description: 'أكثر من 120+ دورة', icon: course_icon1, bgColor: 'bg-primary' },
    { id: 2, title: 'المعسكرات', description: 'أكثر من 120+ دورة', icon: course_icon2, bgColor: 'bg-none' },
    { id: 3, title: 'المذكرات', description: 'أكثر من 120+ دورة', icon: course_icon3, bgColor: 'bg-none' },
  ];

  const displayData = contents.length > 0 ? contents : fallbackData;

  return (
    <section className="py-16 px-4 lg:px-12">
      <div className="mx-auto">
        <Card className="relative bg-primary rounded-3xl overflow-hidden border-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <CardContent className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-10 lg:p-14">
            <div className="lg:col-span-5">
              <CategoryHeader />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {loading ? (
                // Skeleton cards while loading
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="flex-1 p-4 flex flex-col rounded-3xl animate-pulse">
                    <div className="h-8 bg-white/20 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-8"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                      <div className="w-20 h-20 bg-white/10 rounded-full"></div>
                    </div>
                  </Card>
                ))
              ) : (
                displayData.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Categories;