import React from 'react';
import { CourseCard } from "@/components/courses";

const CourseGrid = ({ courses }) => {
  return (
    <div className="xl:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
        {Array.from({ length: 9 }, (_, index) => {
          const course = courses[index % courses.length];
          return (
            <CourseCard course={course} key={`${course.id}-${index}`} />
          );
        })}
      </div>
    </div>
  );
};

export default CourseGrid;
