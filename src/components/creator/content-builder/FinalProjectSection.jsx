"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import DynamicListInput from "./DynamicListInput";
import RichTextEditor from "@/components/course-page/assignment/RichTextEditor";

export default function FinalProjectSection({ form, setForm }) {
  const handleUpdate = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Tasks handlers
  const addTask = () => {
    const updated = [...(form.tasks || []), ""];
    handleUpdate("tasks", updated);
  };
  const removeTask = (index) => {
    const updated = (form.tasks || []).filter((_, i) => i !== index);
    handleUpdate("tasks", updated);
  };
  const changeTask = (index, value) => {
    const updated = [...(form.tasks || [])];
    updated[index] = value;
    handleUpdate("tasks", updated);
  };

  // Materials handlers
  const addMaterial = () => {
    const updated = [...(form.materials || []), ""];
    handleUpdate("materials", updated);
  };
  const removeMaterial = (index) => {
    const updated = (form.materials || []).filter((_, i) => i !== index);
    handleUpdate("materials", updated);
  };
  const changeMaterial = (index, value) => {
    const updated = [...(form.materials || [])];
    updated[index] = value;
    handleUpdate("materials", updated);
  };

  return (
    <div className="space-y-10" dir="rtl">
      <div>
        <h2 className="text-xl font-bold text-gray-900 text-right">المشروع النهائي</h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed text-right">
          أضف بيانات وتفاصيل المشروع النهائي الذي سيقوم المتعلمون بتسليمه في نهاية المعسكر.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-800 text-right">
          عنوان المشروع
        </label>
        <Input
          type="text"
          value={form.title || ""}
          onChange={(e) => handleUpdate("title", e.target.value)}
          className="text-right h-12"
          placeholder="أدخل عنوان المشروع النهائي"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-800 text-right">
          وصف المشروع
        </label>
        <RichTextEditor
          value={form.description || ""}
          onChange={(val) => handleUpdate("description", val)}
          placeholder="أدخل وصف تفصيلي للمشروع..."
        />
      </div>

      {/* Tasks List */}
      <section className="space-y-4">
         <div className="text-right">
          <label className="block text-sm font-semibold text-gray-800 text-right">
            مهام المشروع
          </label>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed text-right">
            أضف المهام التي يجب على المتعلم تنفيذها خطوة بخطوة.
          </p>
        </div>
        <DynamicListInput
          items={form.tasks || []}
          onAdd={addTask}
          onRemove={removeTask}
          onChange={changeTask}
          addLabel="أضف مهمة"
          minItems={1}
        />
      </section>

      {/* Materials List */}
      <hr className="border-gray-100" />
      <section className="space-y-4">
         <div className="text-right">
          <label className="block text-sm font-semibold text-gray-800 text-right">
            مرفقات وروابط المشروع
          </label>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed text-right">
            أضف أي روابط مفيدة أو مصادر يحتاجها المتعلم لإتمام المشروع.
          </p>
        </div>
        <DynamicListInput
          items={form.materials || []}
          onAdd={addMaterial}
          onRemove={removeMaterial}
          onChange={changeMaterial}
          addLabel="أضف رابط"
          minItems={0}
        />
      </section>
    </div>
  );
}
