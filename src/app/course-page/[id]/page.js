"use client"
import { NavBar } from "@/components/navbar";
import { CourseHero, CourseSidebar } from "@/components/course-page";
import { courseHeroData, courseSidebarData } from '@/data/coursePageData';
import Footer from "@/components/footer";
import CourseHeader from "@/components/course-page/CourseHeader";
import { useParams } from "next/navigation";
import { getCourse } from "@/components/course-page/actions/CourseAction";
import { useEffect, useState } from "react";
import CourseHeroSkeleton from "@/components/course-page/CourseHeroSkeleton";
import CourseSidebarSkeleton from "@/components/course-page/CourseSidebarSkeleton";
import CourseHeaderSkeleton from "@/components/course-page/CourseHeaderSkeleton";

const CoursePage = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const res = await getCourse(id);
      if (res.success) {
        setCourseDetails(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, []);
    return (
      <div>
        <div className="bg-white min-h-screen">
          <div className="px-4 lg:px-8 py-4">
            {
              loading ? (
                <CourseHeaderSkeleton />
              ) : (
                <CourseHeader courseDetails={courseDetails} />
              )
            }
            <div className="mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  {
                    loading ? (
                      <CourseHeroSkeleton />
                    ) : (
                      <CourseHero courseDetails={courseDetails} />
                    )
                  }
                </div>

                <div className="lg:col-span-2">
                  {
                    loading ? (
                      <CourseSidebarSkeleton />
                    ) : (
                      <CourseSidebar courseDetails={courseDetails} />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CoursePage;