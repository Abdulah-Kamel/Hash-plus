"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const sidebarSections = [
  {
    title: "تنظيم المحتوى",
    items: [
      { key: "target-learners", label: "المتعلمين المستهدفين" },
      { key: "intro-video", label: "الفيديو التعريفي" },
    ],
  },
  {
    title: "إنشاء المحتوى الخاص بك",
    items: [
      { key: "curriculum", label: "المقرر" },
      { key: "captions", label: "التعليقات التوضيحية" },
      { key: "attachments", label: "الملحقات" },
    ],
  },
  {
    title: "نشر الدورة الخاصة بك",
    items: [
      { key: "landing-page", label: "صفحة هبوط الدورة التدريبية" },
      { key: "pricing", label: "السعر" },
      { key: "messages", label: "رسائل الدورة" },
    ],
  },
];

const ContentBuilderSidebar = ({ activeSection = "target-learners", onSectionChange }) => {
  return (
    <aside className="w-72 flex-shrink-0 border-l border-gray-200 bg-white p-6 sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-bold text-gray-900 mb-3 text-right">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onSectionChange(item.key)}
                      className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        isActive
                          ? "text-primary font-medium bg-primary/5 border-r-4 border-primary"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {isActive && <span className="ml-1">•</span>}
                      {item.label}
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
