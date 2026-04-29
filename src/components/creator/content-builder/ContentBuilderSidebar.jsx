"use client";
import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sections definition — can filter by contentType
const getSidebarSections = (contentType) => [
  {
    title: "تنظيم المحتوى",
    items: [
      { key: "target-learners", label: "المتعلمين المستهدفين", required: true },
      { key: "intro-video",     label: "الفيديو التعريفي",     required: false },
    ],
  },
  {
    title: "إنشاء المحتوى الخاص بك",
    items: [
      { key: "curriculum",    label: "المقرر",           required: false },
      { key: "captions",      label: "التعليقات التوضيحية", required: false },
      { key: "attachments",   label: "الملحقات",          required: false },
      ...(contentType === "bootcamp"
        ? [{ key: "final-project", label: "المشروع النهائي", required: true }]
        : []
      ),
    ],
  },
  {
    title: contentType === "bootcamp" ? "نشر المعسكر الخاص بك" : "نشر الدورة الخاصة بك",
    items: [
      { key: "landing-page", label: contentType === "bootcamp" ? "صفحة هبوط المعسكر" : "صفحة هبوط الدورة", required: true },
      { key: "pricing",      label: "السعر",     required: true },
      { key: "messages",     label: "الرسائل",   required: true },
    ],
  },
];

const ContentBuilderSidebar = ({
  activeSection = "target-learners",
  onSectionChange,
  sectionCompletion = {},
  contentType = "course",
}) => {
  const sections = getSidebarSections(contentType);

  return (
    <aside className="w-72 flex-shrink-0 border-l border-gray-200 bg-white p-6 sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-bold text-gray-900 mb-3 text-right">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeSection === item.key;
                const isDone = sectionCompletion[item.key];
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onSectionChange(item.key)}
                      className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        isActive
                          ? "text-primary font-medium bg-primary/5 border-r-4 border-primary"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {/* Label */}
                      <span className="flex-1">{item.label}</span>

                      {/* Completion indicator */}
                      {item.required ? (
                        isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )
                      ) : isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 opacity-60" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Submit for review button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 cursor-pointer">
          الرفع للمراجعة
        </Button>
      </div>
    </aside>
  );
};

export default ContentBuilderSidebar;
