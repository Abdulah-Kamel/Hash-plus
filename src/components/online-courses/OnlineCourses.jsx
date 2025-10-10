import React from 'react';
import { onlineCoursesData, onlineCoursesContent } from '../../data/onlineCoursesData';
import OnlineCoursesHeader from './OnlineCoursesHeader';
import OnlineCourseCard from './OnlineCourseCard';

const OnlineCourses = () => {
  return (
    <section className="py-16 px-4 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Right Side - Course Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 order-2 lg:order-1">
            {onlineCoursesData.map((course) => (
              <OnlineCourseCard key={course.id} course={course} />
            ))}
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
