"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, FileText, ClipboardCheck, Link2, Video, Radio, FolderGit2, FileQuestion } from "lucide-react";
import Link from "next/link";

/**
 * Get the appropriate icon for a module based on its type/data
 */
const getModuleIcon = (module, contentType) => {
  if (contentType === "bootcamp") {
    const moduleType = module.moduleType || "video";
    switch (moduleType) {
      case "liveSession":
        return <Radio className="w-4 h-4 text-red-500" />;
      case "quiz":
        return <FileQuestion className="w-4 h-4 text-blue-500" />;
      case "task":
        return <FileText className="w-4 h-4 text-orange-500" />;
      case "video":
        return <Play className="w-4 h-4 text-gray-400" />;
      case "link":
        return <Link2 className="w-4 h-4 text-purple-500" />;
      default:
        if (module.liveSession?.url) return <Radio className="w-4 h-4 text-red-500" />;
        if (module.video?.url) return <Video className="w-4 h-4 text-blue-500" />;
        if (module.projects?.length > 0) return <FolderGit2 className="w-4 h-4 text-green-500" />;
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
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
    if (module.liveSession?.startTime && module.liveSession?.endTime) {
      return `${module.liveSession.startTime} - ${module.liveSession.endTime}`;
    }
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
  if (module.moduleType === "quiz") {
    const count = module.quiz?.length || module.quizData?.length || 0;
    if (count) return `${count} سؤال`;
  }
  return null;
};

/**
 * Module row item
 */
const ModuleItem = ({ module, courseId, contentType, isActive, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(module)}
    className={`w-full p-3 flex items-center gap-2 transition-colors cursor-pointer text-right ${
      isActive ? "bg-primary/5 border-r-4 border-r-primary" : "hover:bg-gray-50 border-r-4 border-r-transparent"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        module.completed ? "bg-primary border-primary" : isActive ? "border-primary" : "border-gray-300"
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

    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-gray-900"}`}>
        {module.title}
      </p>
    </div>

    {getModuleDuration(module, contentType) && (
      <span className="text-xs text-gray-500 flex-shrink-0">
        {getModuleDuration(module, contentType)}
      </span>
    )}

    <div className={`flex-shrink-0 ${isActive ? "text-primary" : ""}`}>
      {getModuleIcon(module, contentType)}
    </div>
  </button>
);

/**
 * Collapsible section
 */
const SectionAccordion = ({ section, index, courseId, contentType, defaultOpen = false, activeModule, onModuleSelect }) => {
  const [open, setOpen] = useState(defaultOpen);
  const modules = section.modules || [];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Section header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors px-4 py-3 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-right flex-1 min-w-0">
          {open
            ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
          }
          <span className="text-sm font-semibold text-gray-900 truncate">
            القسم {index + 1} - {section.title}
          </span>
        </div>
        <span className="text-xs text-gray-500 flex-shrink-0 ms-2">
          {modules.length} محاضرة
        </span>
      </button>

      {/* Modules list */}
      {open && (
        <div className="divide-y divide-gray-100">
          {modules.map((module, mIndex) => {
            const isActive = activeModule?._id === module._id || activeModule?.id === module.id;
            return (
              <ModuleItem
                key={module._id || module.id || mIndex}
                module={module}
                courseId={courseId}
                contentType={contentType}
                isActive={isActive}
                onSelect={(m) => onModuleSelect({ ...m, sectionId: section._id || section.id })}
              />
            );
          })}
          {modules.length === 0 && (
            <div className="px-4 py-3 text-xs text-gray-400 text-center">
              لا يوجد محتوى بعد
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CourseSidebar = ({ courseDetails, activeModule, onModuleSelect }) => {
  const contentType = courseDetails?.contentType || "course";
  const sections = courseDetails?.sections || [];
  const flatModules = courseDetails?.modules || [];
  const courseId = courseDetails?._id;

  // Prefer sections, fallback to flat modules
  const hasSections = sections.length > 0;

  return (
    <div className="p-4 sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-right mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          محتوى {contentType === "bootcamp" ? "المعسكر" : "الدورة"}
        </h2>
        <p className="text-xs text-gray-500">
          {hasSections
            ? `${sections.length} قسم . ${sections.reduce((a, s) => a + (s.modules?.length || 0), 0)} محاضرة`
            : `${flatModules.length} محاضرة`
          }
        </p>
      </div>

      {hasSections ? (
        <div className="space-y-2">
          {sections.map((section, index) => {
            // Check if this section contains the active module
            const hasActive = section.modules?.some(m => m._id === activeModule?._id || m.id === activeModule?.id);
            return (
              <SectionAccordion
                key={section._id || index}
                section={section}
                index={index}
                courseId={courseId}
                contentType={contentType}
                defaultOpen={index === 0 || hasActive}
                activeModule={activeModule}
                onModuleSelect={onModuleSelect}
              />
            );
          })}
        </div>
      ) : flatModules.length > 0 ? (
        <div className="space-y-2 border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden bg-white">
          {flatModules.map((module, index) => {
            const isActive = activeModule?._id === module._id || activeModule?.id === module.id;
            return (
              <ModuleItem
                key={module._id || index}
                module={module}
                courseId={courseId}
                contentType={contentType}
                isActive={isActive}
                onSelect={onModuleSelect}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">لا يوجد محتوى بعد</p>
        </div>
      )}
    </div>
  );
};

export default CourseSidebar;
