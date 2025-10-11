import React from 'react';
import Container from '@/components/container';
import Image from "next/image";
import course_icon3 from "@/assets/course_icon3.svg";
import chessboard from "@/assets/chessboard_secondry.svg";
import arrow_down from "@/assets/arrow-down.svg";
const ShopHero = () => {
  return (
    <div className="relative overflow-hidden py-18">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
      <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-10 left-1/4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white/20 rounded-full"></div>

      {/* Geometric patterns */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full">
          <Image src={chessboard} alt="decorative icon" className="w-full h-full"/>
      </div>
        <div className="absolute bottom-0 left-0 -translate-x-2/5 translate-y-2/5 w-48 h-48 rounded-full">
          <Image src={course_icon3} alt="decorative icon" className="w-full h-full"/>
      </div>
        <div className="absolute top-0 left-0 -translate-y-3 w-60 h-60 rounded-full">
          <Image src={arrow_down} alt="decorative icon" className="w-full h-full"/>
      </div>
        <div className="absolute bottom-0 right-0 rotate-x-180 rotate-y-180 w-60 h-60 rounded-full">
          <Image src={arrow_down} alt="decorative icon" className="w-full h-full"/>
      </div>
      
      <Container className="relative z-10 py-16 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">التعليم</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          منصتنا توفر تجربة تعليمية شاملة مع أحدث التقنيات في مجال التعليم الرقمي<br/>
          لضمان تقديم أفضل تجربة تعليمية ممكنة وتحقيق أهدافك التعليمية
        </p>
      </Container>
    </div>
  );
};

export default ShopHero;
