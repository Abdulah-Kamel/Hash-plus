"use client";
import React from "react";
import RichTextEditor from "@/components/course-page/assignment/RichTextEditor";

export default function MessagesSection({ form, setForm }) {
  const handleUpdate = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div>
         <h2 className="text-xl font-bold text-gray-900 text-right">رسائل المعسكر</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-[15px] font-bold text-gray-800 text-right">رسالة ترحيب</h3>
        <RichTextEditor 
          value={form.welcomeMessage || ""} 
          onChange={(val) => handleUpdate("welcomeMessage", val)}
          placeholder="اكتب هنا"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-[15px] font-bold text-gray-800 text-right">رسالة تهنئة</h3>
        <RichTextEditor 
          value={form.congratulationMessage || ""} 
          onChange={(val) => handleUpdate("congratulationMessage", val)}
          placeholder="اكتب هنا"
        />
      </div>
    </div>
  );
}
