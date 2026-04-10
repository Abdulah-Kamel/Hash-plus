"use client"
import React, { useState } from 'react';
import { ChevronDown, Play, FileText, ClipboardCheck, Link2, Video, Radio, FolderGit2 } from "lucide-react";
import Link from "next/link";

/**
 * Get the appropriate icon for a module based on its type/data
 */
const getModuleIcon = (module, contentType) => {
  if (contentType === "bootcamp") {
    if (module.liveSession?.url) return <Radio className="w-4 h-4 text-red-500" />;
    if (module.video?.url) return <Video className="w-4 h-4 text-blue-500" />;
    if (module.projects?.length > 0) return <FolderGit2 className="w-4 h-4 text-green-500" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  }

  // Course module types
  switch (module.moduleType) {
    case "video":
      return <Play className="w-4 h-4 text-gray-400" />;
    case "quiz":
      return <ClipboardCheck className="w-4 h-4 text-blue-500" />;
    case "task":
      return <FileText className="w-4 h-4 text-orange-500" />;
    case "link":
      return <Link2 className="w-4 h-4 text-purple-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-400" />;
  }
};

/**
 * Get the duration display for a module
 */
const getModuleDuration = (module, contentType) => {
  if (contentType === "bootcamp") {
    if (module.timeStart && module.timeEnd) {
      return `${module.timeStart} - ${module.timeEnd}`;
    }
    if (module.video?.duration) {
      return `${module.video.duration} دقيقة`;
    }
    return null;
  }

  // Course modules
  if (module.moduleType === "video" && module.videoData?.duration) {
    const mins = Math.floor(module.videoData.duration / 60);
    return `${mins} دقيقة`;
  }
  if (module.moduleType === "quiz" && module.quizData?.length) {
    return `${module.quizData.length} سؤال`;
  }
  return null;
};

/**
 * Get module badges
 */
const getModuleBadges = (module, contentType) => {
  const badges = [];

  if (contentType === "bootcamp") {
    if (module.liveSession?.url) {
      badges.push({ label: "بث مباشر", color: "bg-red-100 text-red-800" });
    }
    if (module.projects?.length > 0) {
      badges.push({ label: `${module.projects.length} مشروع`, color: "bg-green-100 text-green-800" });
    }
  } else {
    // Course modules
    if (module.isFree) {
      badges.push({ label: "مجاني", color: "bg-green-100 text-green-800" });
    }
    if (module.moduleType === "quiz") {
      badges.push({ label: "اختبار", color: "bg-blue-100 text-blue-800" });
    }
    if (module.moduleType === "task") {
      badges.push({ label: "مهمة", color: "bg-orange-100 text-orange-800" });
    }
  }

  return badges;
};

const CourseSidebar = ({ courseDetails }) => {
  const contentType = courseDetails?.contentType || "course";
  const modules = courseDetails?.modules || [];

  return (
    <div className="p-4 sticky top-24">
      <div className="text-right mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {courseDetails?.title}
        </h2>
        <p className="text-sm text-gray-600">{courseDetails?.description}</p>
      </div>

      <div className="space-y-2">
        {modules.map((module, index) => (
          <Link
            href={`/course-page/${courseDetails?._id}/module/${module._id}`}
            key={module._id || index}
            className="p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                module.completed ? "bg-primary border-primary" : "border-gray-300"
              }`}
            >
              {module.completed && (
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
              <p className="text-sm font-medium text-gray-900">{module.title}</p>
              {module.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{module.description}</p>
              )}
            </div>

            {getModuleDuration(module, contentType) && (
              <span className="text-xs text-gray-500 flex-shrink-0">
                {getModuleDuration(module, contentType)}
              </span>
            )}

            <div className="flex-shrink-0">
              {getModuleIcon(module, contentType)}
            </div>

            <div className="flex flex-shrink-0 gap-1">
              {getModuleBadges(module, contentType).map((badge, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {modules.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">لا يوجد محتوى بعد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;
