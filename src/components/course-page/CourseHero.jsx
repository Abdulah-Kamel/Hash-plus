import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';

const CourseHero = ({ data }) => {
    return (
        <div className="">
            <div className="px-2 lg:px-4 py-4">
                <div className="mx-auto">
                    <CourseVideo video={data.video} />
                    <CourseTabs courseData={data}/>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;
