import React from 'react';
import Image from "next/image";
import chessboard_secondry from "@/assets/chessboard_secondry.svg"
import course_icon3 from "@/assets/course_icon3.svg"
const LibraryHeader = () => {
    return (
        <div className="relative bg-primary overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="w-32 sm:w-40 h-32 sm:h-40">
                    <Image src={chessboard_secondry} alt={"chessboard_secondry"} className="w-full h-full"/>
                </div>
                <div className="absolute -bottom-1/4 left-12 transform -translate-x-1/2">
                    <Image src={course_icon3} alt={"course_icon3"} className="w-32 sm:w-40 h-32 sm:h-40"/>
                </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-4 lg:px-8 py-24 text-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    مكتبة التعلم
                </h1>
            </div>
        </div>
    );
};

export default LibraryHeader;
