import React from 'react';
import { Play } from 'lucide-react';
import Image from "next/image";

const CourseVideo = ({ video }) => {
    return (
        <div className="relative  mx-auto rounded-xl overflow-hidden mb-4 w-full max-h-[490px]">
            <Image
                src={video}
                alt="Course video"
                className="w-full h-full object-cover"
            />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <button className="absolute inset-0 flex items-center justify-center group z-10">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                </div>
            </button>
        </div>
    );
};

export default CourseVideo;
