import React from "react";
import chessboard_secondry from "@/assets/chessboard_secondry.svg";
import course_icon3 from "@/assets/course_icon3.svg";
import Image from "next/image";

const StudentsHeader = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/5 via-white to-white">
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-32 sm:w-40 h-32 sm:h-40">
            <Image
              src={chessboard_secondry}
              alt={"chessboard_secondry"}
              className="w-full h-full"
            />
          </div>
          <div className="absolute -bottom-1/4 left-12 transform -translate-x-1/2">
            <Image
              src={course_icon3}
              alt={"course_icon3"}
              className="w-32 sm:w-40 h-32 sm:h-40"
            />
          </div>
        </div>

        <div className="relative z-10 px-4 lg:px-8 py-24 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            التقنيين
          </h1>
        </div>
      </div>
    </section>
  );
};

export default StudentsHeader;
