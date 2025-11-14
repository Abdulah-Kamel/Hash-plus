import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';

const CourseHero = ({ courseDetails }) => {
    return (
        <div className="">
            <div className="px-2 lg:px-4 py-4">
                <div className="mx-auto">
                    <CourseVideo video={"https://youtu.be/gIGGhFlGgLI"} />
                    <CourseTabs courseData={courseDetails}/>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;
