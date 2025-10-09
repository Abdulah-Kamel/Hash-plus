import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';
import CourseDescription from './CourseDescription';
import CourseRequirements from './CourseRequirements';
import CourseOutcomes from './CourseOutcomes';
import CourseStats from './CourseStats';

const CourseHero = ({ data }) => {
  return (
    <div className="">
      <div className="px-2 lg:px-4 py-4">
        <div className="mx-auto">
          <CourseVideo video={data.video} />
          <CourseTabs />
          <CourseDescription description={data.description} />
          <CourseRequirements requirements={data.requirements} />
          <CourseOutcomes outcomes={data.outcomes} />
          <CourseStats />
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
