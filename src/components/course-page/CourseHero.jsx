import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';

import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

// Import Viewers
import VideoViewer from './viewers/VideoViewer';
import QuizViewer from './viewers/QuizViewer';
import LinkViewer from './viewers/LinkViewer';
import TaskViewer from './viewers/TaskViewer';
import LiveSessionViewer from './viewers/LiveSessionViewer';

const CourseHero = ({ courseDetails, activeModule }) => {
    const isBootcamp = courseDetails?.contentType === "bootcamp";
    const welcomeVideoUrl = courseDetails?.welcomeVideo?.url;

    const thumbnailUrl = courseDetails?.thumbnail?.url || courseDetails?.image;

    const renderViewer = () => {
        if (!activeModule) {
            if (welcomeVideoUrl && !isBootcamp) {
                return <CourseVideo 
                            videoUrl={welcomeVideoUrl} 
                            videoKey={courseDetails?.welcomeVideo?.key} 
                            thumbnailUrl={thumbnailUrl} 
                            contentId={courseDetails?._id}
                            contentType={courseDetails?.contentType}
                        />;
            }
            return null;
        }

        const type = activeModule.moduleType || "video";

        switch (type) {
            case "video":
                return <VideoViewer module={activeModule} thumbnailUrl={thumbnailUrl} contentId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
            case "quiz":
                return <QuizViewer module={activeModule} courseId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
            case "link":
                return <LinkViewer module={activeModule} />;
            case "task":
                return <TaskViewer module={activeModule} courseId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
            case "liveSession":
                return <LiveSessionViewer module={activeModule} />;
            default:
                // Fallback to VideoViewer or depending on data inside module
                if (activeModule.liveSession) return <LiveSessionViewer module={activeModule} />;
                if (activeModule.task || activeModule.taskData) return <TaskViewer module={activeModule} courseId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
                if (activeModule.link || activeModule.linkData) return <LinkViewer module={activeModule} />;
                if (activeModule.quiz || activeModule.quizData) return <QuizViewer module={activeModule} courseId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
                return <VideoViewer module={activeModule} thumbnailUrl={thumbnailUrl} contentId={courseDetails?._id || courseDetails?.id} contentType={courseDetails?.contentType} />;
        }
    };

    return (
        <div className="">
            <div className="px-2 lg:px-4 py-4">
                <div className="mx-auto flex flex-col gap-4">
                    {/* Meeting Link for Bootcamps */}
                    {isBootcamp && !activeModule && (
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

                    {/* Module Viewer or Course Video */}
                    {renderViewer()}

                    <CourseTabs courseData={courseDetails}/>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;

