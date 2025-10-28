import React from "react";
import Container from "@/components/container";
import Image from "next/image";

const CoursesShowcase = () => {
  const courses = [
    {
      title: "مكونات JavaScript",
      rating: 5.0,
      reviews: 17,
      description: "تعلم أساسيات JavaScript وبناء تطبيقات تفاعلية",
      badge: "جديد",
      color: "from-[#FFE5E5] to-[#FFF5F5]",
      icon: <div className="text-6xl font-bold text-[#FF6B6B]">JS</div>,
    },
    {
      title: "مبادئ HTML",
      rating: 4.8,
      reviews: 24,
      description: "أساسيات بناء صفحات الويب باستخدام HTML5",
      badge: "شائع",
      color: "from-[#FFE8D6] to-[#FFF5EB]",
      icon: <div className="text-6xl font-bold text-[#FF8C42]">HTML</div>,
    },
    {
      title: "تصميم CSS",
      rating: 4.9,
      reviews: 19,
      description: "تعلم تصميم واجهات جميلة باستخدام CSS الحديث",
      badge: "متقدم",
      color: "from-[#E8F4FF] to-[#F5FAFF]",
      icon: <div className="text-6xl font-bold text-[#4A90E2]">CSS</div>,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#F9F9FF] via-white to-white py-16 lg:py-20">
      <Container>
        {/* Header */}
        <div dir="rtl" className="text-center mb-12 lg:mb-14">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            دوراتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            أفضل محتوى تقني اونلاين على الاطلاق
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            دورات تدريبية شاملة ومتنوعة تغطي جميع مجالات البرمجة والتقنية من
            الأساسيات إلى الاحتراف
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-10">
          {courses.map((course, index) => (
            <div
              key={index}
              dir="rtl"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Course Icon/Image */}
              <div
                className={`relative h-44 bg-gradient-to-br ${course.color} flex items-center justify-center`}
              >
                {course.icon}
                {course.badge && (
                  <span className="absolute top-4 right-4 bg-white px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary shadow-md">
                    {course.badge}
                  </span>
                )}
              </div>

              {/* Course Content */}
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({course.reviews} تقييم)
                  </span>
                </div>

                <h3 className="text-xl md:text-[1.4rem] font-bold text-gray-900 leading-tight">
                  {course.title}
                </h3>

                <p className="text-base text-gray-700 leading-[1.7]">
                  {course.description}
                </p>

                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40">
                  تعلم أكثر
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
            عرض جميع الدورات
          </button>
          <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-primary font-semibold rounded-lg transition-all duration-300 border-2 border-primary hover:-translate-y-0.5">
            انضم إلينا
          </button>
        </div>
      </Container>
    </section>
  );
};

export default CoursesShowcase;
