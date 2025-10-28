import React from "react";
import Container from "@/components/container";

const CTABanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#635BFF] via-[#7C75FF] to-[#8F88FF] py-16 lg:py-20 overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] bg-white/5 rounded-full blur-3xl"></div>

        {/* Plus shapes */}
        <div className="absolute top-20 right-1/4 text-white/10">
          <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 text-white/10">
          <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-1/3 left-10 w-16 h-16 border-3 border-white/10 rounded-lg rotate-12"></div>
        <div className="absolute bottom-1/4 right-16 w-14 h-14 border-3 border-white/10 rounded-full"></div>

        {/* Small dots */}
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-white/20 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
      </div>

      <Container className="relative z-10">
        <div dir="rtl" className="text-center space-y-7">
          {/* Badge */}
          <span className="inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
            انضم إلينا الآن
          </span>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
            أفضل المعلمين الموجودين على الاطلاق في منصتنا للنجاح
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            انضم إلى آلاف المتعلمين واحصل على شهادات معتمدة من أفضل المدربين في
            العالم العربي
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-primary font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-base">
              انضم إلينا
            </button>
            <button className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300 border-2 border-white hover:-translate-y-1 text-base backdrop-blur-sm">
              تواصل معنا
            </button>
          </div>

          {/* Stats or Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                +10,000
              </div>
              <div className="text-sm md:text-base text-white/85">طالب نشط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                +500
              </div>
              <div className="text-sm md:text-base text-white/85">
                دورة تدريبية
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                +100
              </div>
              <div className="text-sm md:text-base text-white/85">
                مدرب محترف
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                4.9
              </div>
              <div className="text-sm md:text-base text-white/85">
                تقييم المنصة
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTABanner;
