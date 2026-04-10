import React, { useEffect } from "react";
import { CourseCard } from "@/components/courses";
import { useShopFilterStore } from "@/store/useShopFilterStore";
import { getAllContents } from "@/actions/contentActions";
import CourseCardSkeleton from "../courses/CourseCardSkeleton";

const CourseGrid = () => {
  const {
    filteredCourses,
    loading,
    setLoading,
    setAllCourses,
    applyFilters,
  } = useShopFilterStore();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await getAllContents();
      if (res.success) {
        setAllCourses(res.data.data || [], res.data.pagination);
        applyFilters();
        setLoading(false);
      } else {
        console.log(res.error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="xl:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
        {loading ? (
          <CourseCardSkeleton />
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard course={course} key={course._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-400">
            <p className="text-lg">لا توجد نتائج تطابق التصفية</p>
            <p className="text-sm mt-2">جرب تغيير الفلاتر للحصول على نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
