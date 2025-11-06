import React, { useEffect } from "react";
import { CourseCard } from "@/components/courses";
import { useCoursesStore } from "@/store/useCoursesStore";
import { getAllCourses } from "../courses/CourseActions";

const CourseGrid = () => {
  const { courses, setCourses } = useCoursesStore();
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      if (res.success) {
        console.log(res.data);
        setCourses(res.data.data);
      } else {
        console.log(res.error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="xl:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
