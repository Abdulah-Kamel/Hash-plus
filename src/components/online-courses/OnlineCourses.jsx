import React from 'react';
import { onlineCoursesData, onlineCoursesContent } from '../../data/onlineCoursesData';
import OnlineCoursesHeader from './OnlineCoursesHeader';
import OnlineCourseCard from './OnlineCourseCard';

const OnlineCourses = () => {
  return (
    <section className="py-16 px-4 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Right Side - Course Cards */}
          <div className="relative order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center lg:justify-start">
              {onlineCoursesData.map((course, index) => (
                <div 
                  key={course.id} 
                  className={`w-100 sm:w-64 lg:w-80 ${index === 0 ? "sm:rotate-12 sm:z-10" : "sm:-rotate-12"}`}
                >
                  <OnlineCourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Left Side - Header */}
          <div className="order-1 lg:order-2">
            <OnlineCoursesHeader content={onlineCoursesContent} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineCourses;
