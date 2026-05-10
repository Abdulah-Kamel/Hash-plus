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
  const [activeModule, setActiveModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const res = await getCourse(id);
      if (res.success) {
        const data = res.data.data;
        setCourseDetails(data);
        
        // Find the first module to set as active initially
        let firstModule = null;
        if (data.sections?.length > 0 && data.sections[0].modules?.length > 0) {
          firstModule = { ...data.sections[0].modules[0], sectionId: data.sections[0]._id || data.sections[0].id };
        } else if (data.modules?.length > 0) {
          firstModule = data.modules[0];
        }
        if (firstModule) {
          setActiveModule(firstModule);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

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
                      <CourseHero 
                        courseDetails={courseDetails} 
                        activeModule={activeModule} 
                      />
                    )
                  }
                </div>

                <div className="lg:col-span-2">
                  {
                    loading ? (
                      <CourseSidebarSkeleton />
                    ) : (
                      <CourseSidebar 
                        courseDetails={courseDetails} 
                        activeModule={activeModule}
                        onModuleSelect={setActiveModule}
                      />
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