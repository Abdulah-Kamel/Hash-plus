import React from 'react';
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { 
  CourseHero, 
  CourseSidebar, 
  CourseContent, 
  RelatedCourses 
} from "@/components/course-details";

export const metadata = {
  title: "تفاصيل الدورة",
  description: "تعرف على تفاصيل الدورة التدريبية، المحتوى، المدرب، والمتطلبات. احصل على معلومات شاملة قبل التسجيل في الدورة.",
  keywords: [
    "تفاصيل الدورة",
    "محتوى الدورة",
    "معلومات المدرب",
    "متطلبات الدورة",
    "تسجيل في الدورة",
    "مراجعات الطلاب",
    "شهادة معتمدة"
  ],
  openGraph: {
    title: "Hash Plus - تفاصيل الدورة",
    description: "تعرف على تفاصيل الدورة التدريبية والمحتوى المقدم",
    url: "https://hashplus.com/course",
    images: [
      {
        url: "/og-course.jpg",
        width: 1200,
        height: 630,
        alt: "Hash Plus - تفاصيل الدورة",
      },
    ],
  },
};

const CoursePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            {/* Main Content */}
            <Container className="py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-14">
                        {/* Course Hero Section */}
                        <CourseHero />
                    {/* Course Content */}
                        <CourseContent />
                    </div>
                    {/* Sidebar - Right Column */}
                    <div className="lg:col-span-1">
                        <CourseSidebar />
                    </div>

                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default CoursePage;
