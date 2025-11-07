"use client";
import React, { useState } from "react";
import {
  CourseHero,
  CourseContent,
  CourseSidebar,
} from "@/components/course-details";
import { useCoursesStore } from "@/store/useCoursesStore";
import { useEffect } from "react";
import { getSingelCourses } from "./CourseDetailsActions";
import { useParams } from "next/navigation";
import CourseHeroSkeleton from "./CourseHeroSkeleton";
import CourseContentSkeleton from "./CourseContentSkeleton";
const CourseDetails = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const res = await getSingelCourses(id);
      if (res.success) {
        setCourseDetails(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(res.error);
      }
    };
    fetchCourseDetails();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-14 max-sm:order-2">
        {loading ? (
          <CourseHeroSkeleton />
        ) : (
          <CourseHero courseDetails={courseDetails} />
        )}
        {loading ? (
          <CourseContentSkeleton />
        ) : (
          <CourseContent courseDetails={courseDetails} />
        )}
      </div>
      <div className="lg:col-span-1 max-sm:order-1">
        <CourseSidebar courseDetails={courseDetails} />
      </div>
    </div>
  );
};

export default CourseDetails;
