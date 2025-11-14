"use client"
import React, { useState } from 'react';
import { ChevronDown, Play, FileText, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const CourseSidebar = ({ courseDetails }) => {
  const [expandedSections, setExpandedSections] = useState([1]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Combine modules and tests, then sort by globalOrder
  const getCombinedContent = () => {
    const modules =
      courseDetails?.modules?.map((module) => ({
        ...module,
        type: "module",
      })) || [];

    const tests =
      courseDetails?.tests?.map((test) => ({
        ...test,
        type: "test",
      })) || [];

    return [...modules, ...tests].sort(
      (a, b) => (a.globalOrder || 0) - (b.globalOrder || 0)
    );
  };

  const combinedContent = getCombinedContent();

  return (
    <div className="p-4 sticky top-24">
      <div className="text-right mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {courseDetails?.title}
        </h2>
        <p className="text-sm text-gray-600">{courseDetails?.subtitle}</p>
      </div>

      <div className="space-y-2">
        {combinedContent.map((item, index) => (
          <Link
            href={
              item.type === "test"
                ? `/course-page/${
                    courseDetails?._id || courseDetails?.id
                  }/assignment/${item._id}`
                : `/course-page/${
                    courseDetails?._id || courseDetails?.id
                  }/module/${item._id}`
            }
            key={item._id || item.id}
            className="p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                item.completed ? "bg-primary border-primary" : "border-gray-300"
              }`}
            >
              {item.completed && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            <div className="flex-1 text-right">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              )}
            </div>

            <span className="text-xs text-gray-500">
              {item.type === "module"
                ? `${item.duration} دقيقة`
                : `${item.timeLimit} دقيقة`}
            </span>

            <div className="flex-shrink-0">
              {item.type === "test" ? (
                <ClipboardCheck className="w-4 h-4 text-blue-500" />
              ) : item.moduleType === "video" ? (
                <Play className="w-4 h-4 text-gray-400" />
              ) : (
                <FileText className="w-4 h-4 text-gray-400" />
              )}
            </div>

            <div className="flex flex-shrink-0 gap-1">
              {item.type === "module" && item.isFree && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  مجاني
                </span>
              )}

              {item.type === "test" && item.isRequired && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  مطلوب
                </span>
              )}

              {item.type === "test" && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.totalQuestions} سؤال
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
