import React, { useEffect } from "react";
import { CourseCard } from "@/components/courses";
import { useCoursesStore } from "@/store/useCoursesStore";
import { getAllContents } from "@/actions/contentActions";
import CourseCardSkeleton from "../courses/CourseCardSkeleton";
const CourseGrid = () => {
  const { courses, setCourses,setLoading,loading } = useCoursesStore();
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await getAllContents();
      if (res.success) {
        console.log(res.data);
        setCourses(res.data.data);
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
        ) : (
          courses.map((course) => (
            <CourseCard course={course} key={course._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
