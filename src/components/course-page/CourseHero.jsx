import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';

import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const CourseHero = ({ courseDetails }) => {
    const isBootcamp = courseDetails?.contentType === "bootcamp";
    const welcomeVideoUrl = courseDetails?.welcomeVideo?.url;

    return (
        <div className="">
            <div className="px-2 lg:px-4 py-4">
                <div className="mx-auto flex flex-col gap-4">
                    {/* Meeting Link for Bootcamps */}
                    {isBootcamp && (
                        <Link 
                            href={courseDetails?.meetingLink || "#"} 
                            target="_blank"
                            className="w-full flex items-center justify-between bg-primary/10 hover:bg-primary/20 text-primary p-4 rounded-xl transition-colors border border-primary/20"
                        >
                            <span className="font-bold text-lg">رابط الاجتماع</span>
                            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg">
                                <LinkIcon className="w-5 h-5" />
                            </div>
                        </Link>
                    )}

                    {/* Course Video (if exists) */}
                    {welcomeVideoUrl && !isBootcamp && (
                        <CourseVideo video={welcomeVideoUrl} />
                    )}

                    <CourseTabs courseData={courseDetails}/>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;
