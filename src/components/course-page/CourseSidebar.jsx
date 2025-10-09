'use client';
import React, { useState } from 'react';
import { ChevronDown, Play, FileText } from 'lucide-react';

const CourseSidebar = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState([1]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="p-4 sticky top-24">
      <div className="text-right mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{data.title}</h2>
        <p className="text-sm text-gray-600">{data.subtitle}</p>
      </div>

      <div className="space-y-2">
        {data.sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-3 flex items-center justify-between bg-[#F5F5F5] hover:bg-gray-50 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.includes(section.id) ? 'rotate-180' : ''
                }`}
              />
              <div className="flex-1 text-right mr-2">
                <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                <p className="text-xs text-gray-500">{section.duration}</p>
              </div>
              <div className="text-xs text-gray-500">{section.progress}</div>
            </button>

            {/* Lessons List */}
            {expandedSections.includes(section.id) && section.lessons.length > 0 && (
              <div className="border-t border-gray-200">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {/* Checkbox/Status */}
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      lesson.completed ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {lesson.completed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-900">{lesson.title}</p>
                    </div>

                    {/* Duration */}
                    {lesson.duration && (
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    )}

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {lesson.type === 'video' ? (
                        <Play className="w-4 h-4 text-gray-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
