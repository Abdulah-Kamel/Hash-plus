import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpenText } from 'lucide-react';
import Rating from '../shared/Rating';
import courseProfile from "../../assets/courseProfile.png";

const OnlineCourseCard = ({ course }) => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-lg p-4 transition-transform duration-300 flex flex-col">
      <div className="relative">
        <Link href={`/courses/${course.id}`}>
          <Image className="w-full rounded-2xl object-cover h-48" src={course.image} alt={course.title} width={320} height={192} />
        </Link>
      </div>
      
      <div className="flex-grow flex flex-col">
        {/* Rating Section */}
        <div className="flex items-center mt-2.5 mb-5">
          <span className="text-base font-light px-2.5 py-0.5 rounded-sm">
            ({course.reviews})
          </span>
          <div className="flex items-center">
            <Rating rating={course.rating} />
            <span className="text-base font-light px-2.5 py-0.5 rounded-sm ms-1">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="my-2">
          <h2 className="text-2xl font-medium">{course.title}</h2>
        </div>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <div className="bg-[#F0F0F0] w-8 h-8 flex justify-center items-center rounded-full me-2">
            <Image className="rounded-full" src={courseProfile} alt="Instructor avatar" width={32} height={32} />
          </div>
          <p className="text-base font-light">{course.instructor}</p>
        </div>

        {/* Course Info */}
        <div className="mt-4 flex items-center justify-between me-6 border-b border-[#E6E6E6] py-2.5">
          <div className="text-qusecondary flex items-center gap-2">
            <Clock className="text-qusecondary" />
            <p>{course.duration}</p>
          </div>
          <div className="text-qusecondary flex items-center gap-2">
            <BookOpenText className="text-qusecondary" />
            <p>{course.lessons}</p>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between flex-wrap gap-3 mt-auto pt-4">
          <div className="text-3xl font-semibold text-gray-900 flex gap-1">
            <span>ر.س</span>
            <span>{course.price}</span>
          </div>
          <button
            type="button"
            className="border border-[#E6E6E6] rounded-full hover:bg-primary hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-6 py-3 text-center"
          >
            اضف الى السلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineCourseCard;
