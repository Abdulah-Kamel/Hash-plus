import React from 'react';
import Image from 'next/image';
import courses_arrow from "../../assets/courses_arrow.svg";

const CourseHeader = () => {
  return (
    <>
      <div className="text-right mb-12">
        <h2 className="text-4xl font-bold tracking-tight leading-normal text-gray-900 sm:text-5xl">
          أفضل الدورات المقدمة <br /> خصيصاً إليك
        </h2>
      </div>
      <Image
        src={courses_arrow}
        alt="course svg arrow"
        className="absolute left-1 top-1 w-16 sm:w-24 md:w-32 lg:w-44 xl:w-56 h-auto select-none pointer-events-none"
        width={224} 
        height={100} 
      />
    </>
  );
};

export default CourseHeader;
