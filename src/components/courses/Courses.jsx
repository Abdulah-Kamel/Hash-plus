"use client";
import React from "react";
import CourseCard from "./CourseCard";
import CourseHeader from "./CourseHeader";
import CourseTabs from "./CourseTabs";
import { Card, CardContent } from "@/components/ui/card";
import { useCoursesStore } from "@/store/useCoursesStore";
import { useEffect } from "react";
import { getAllCourses } from "./CourseActions";

const Courses = () => {
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
    <section className="p-4 lg:px-12">
      <Card className="bg-[#6E82F41A] border-0">
        <CardContent className="relative w-full px-6 lg:px-10 py-14">
          <CourseHeader />
          <CourseTabs />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mt-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Courses;
