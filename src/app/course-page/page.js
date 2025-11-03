import { NavBar } from "@/components/navbar";
import { CourseHero, CourseSidebar } from "@/components/course-page";
import { courseHeroData, courseSidebarData } from '@/data/coursePageData';
import Footer from "@/components/footer";

import CourseHeader from "@/components/course-page/CourseHeader";

const CoursePage = () => {

    return (
      <div>
        <NavBar />

        <div className="bg-white min-h-screen">
          <div className="px-4 lg:px-8 py-4">
            <CourseHeader />
            <div className="mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <CourseHero data={courseHeroData} />
                </div>

                <div className="lg:col-span-2">
                  <CourseSidebar data={courseSidebarData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}

export default CoursePage;