import React from 'react';
import { coursesData } from '../../data/coursesData';
import CourseCard from './CourseCard';
import CourseHeader from './CourseHeader';
import CourseTabs from './CourseTabs';

const Courses = () => {
  return (
    <section className="p-4 lg:px-12">
      <div className="mx-auto relative w-full px-6 lg:px-10 py-14 rounded-2xl bg-[#6E82F41A]">
        <CourseHeader />
        <CourseTabs />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mt-8">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;