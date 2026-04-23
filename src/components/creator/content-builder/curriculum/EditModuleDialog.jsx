"use client";
import React, { useState, useEffect } from "react";
import {
  Video,
  Link,
  FileText,
  ClipboardList,
  X,
  ListChecks,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Shared field components ──────────────────────────────────────────────────

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-800 text-right">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({
  value,
  onChange,
  placeholder,
  dir = "rtl",
  type = "text",
}) => (
  <Input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
    dir={dir}
  />
);

// ─── Type-specific forms ──────────────────────────────────────────────────────

const VideoEditForm = ({ form, setForm }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <Field label="اسم المحتوى" required>
      <TextInput
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="مثال: مقدمة إلى التصميم"
      />
    </Field>
    <Field label="رابط الفيديو" required>
      <TextInput
        value={form.videoUrl}
        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        placeholder="https://www.youtube.com/watch?v=..."
        dir="ltr"
      />
    </Field>
  </div>
);

const LinkEditForm = ({ form, setForm }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <Field label="اسم المحتوى" required>
      <TextInput
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="مثال: مقدمة إلى التصميم"
      />
    </Field>
    <Field label="الوصف">
      <TextInput
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="وصف مختصر للرابط"
      />
    </Field>
    <Field label="الرابط" required>
      <TextInput
        value={form.linkUrl}
        onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
        placeholder="https://..."
        dir="ltr"
      />
    </Field>
    <Field label="التاريخ" required>
      <TextInput
        type="date"
        value={form.linkDate}
        onChange={(e) => setForm({ ...form, linkDate: e.target.value })}
        dir="ltr"
      />
    </Field>
  </div>
);

const TaskEditForm = ({ form, setForm }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <Field label="اسم المحتوى" required>
      <TextInput
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="مثال: تكليف الأسبوع الأول"
      />
    </Field>
    <Field label="الوصف">
      <TextInput
        value={form.taskDescription}
        onChange={(e) => setForm({ ...form, taskDescription: e.target.value })}
        placeholder="وصف التكليف"
      />
    </Field>
    <Field label="رابط التكليف" required>
      <TextInput
        value={form.taskUrl}
        onChange={(e) => setForm({ ...form, taskUrl: e.target.value })}
        placeholder="https://..."
        dir="ltr"
      />
    </Field>
    <Field label="رابط الصورة">
      <TextInput
        value={form.taskImageUrl}
        onChange={(e) => setForm({ ...form, taskImageUrl: e.target.value })}
        placeholder="https://...image.png"
        dir="ltr"
      />
    </Field>
  </div>
);

// MCQ answer helpers
const mkAnswer = () => ({
  id: crypto.randomUUID(),
  text: "",
  isCorrect: false,
});

const QuizEditForm = ({ form, setForm }) => {
  const isMcq = form.quizSubType === "mcq";
  const questions = form.questions?.length ? form.questions : [];

  const updateQs = (qs) => setForm({ ...form, questions: qs });

  const addQ = () =>
    updateQs([
      ...questions,
      {
        id: crypto.randomUUID(),
        text: "",
        answers: isMcq ? [mkAnswer(), mkAnswer()] : [],
      },
    ]);
  const removeQ = (qId) => updateQs(questions.filter((q) => q.id !== qId));
  const updateQText = (qId, text) =>
    updateQs(questions.map((q) => (q.id === qId ? { ...q, text } : q)));

  const addA = (qId) =>
    updateQs(
      questions.map((q) =>
        q.id === qId ? { ...q, answers: [...q.answers, mkAnswer()] } : q,
      ),
    );
  const removeA = (qId, aId) =>
    updateQs(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: q.answers.filter((a) => a.id !== aId) }
          : q,
      ),
    );
  const updateAText = (qId, aId, text) =>
    updateQs(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === aId ? { ...a, text } : a,
              ),
            }
          : q,
      ),
    );
  const setCorrect = (qId, aId) =>
    updateQs(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: q.answers.map((a) => ({
                ...a,
                isCorrect: a.id === aId,
              })),
            }
          : q,
      ),
    );

  return (
    <div className="flex flex-col gap-4 py-2" dir="rtl">
      <Field label="اسم الاختبار" required>
        <TextInput
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="مثال: اختبار الوحدة الأولى"
        />
      </Field>

      <div className="border-t border-gray-100" />

      {/* Questions */}
      <div className="flex flex-col gap-5 max-h-[40vh] overflow-y-auto pr-1">
        {questions.map((q, qi) => (
          <div key={q.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => removeQ(q.id)}
                disabled={questions.length <= 1}
                className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-gray-500">
                السؤال {qi + 1}
              </span>
            </div>
            <Input
              value={q.text}
              onChange={(e) => updateQText(q.id, e.target.value)}
              placeholder={isMcq ? "ما هو..." : "اكتب سؤالك هنا..."}
              className="text-right h-10 border-gray-200 rounded-lg focus-visible:ring-primary text-sm"
              dir="rtl"
            />
            {isMcq && (
              <div className="flex flex-col gap-2 pr-2 border-r-2 border-gray-100">
                <span className="text-xs text-gray-500 text-right">
                  الإجابات
                </span>
                {q.answers.map((a) => (
                  <div key={a.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeA(q.id, a.id)}
                      disabled={q.answers.length <= 2}
                      className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-0 cursor-pointer flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <Input
                      value={a.text}
                      onChange={(e) => updateAText(q.id, a.id, e.target.value)}
                      placeholder="أدخل إجابة..."
                      className="flex-1 text-right h-9 border-gray-200 rounded-lg focus-visible:ring-primary text-sm"
                      dir="rtl"
                    />
                    <button
                      type="button"
                      onClick={() => setCorrect(q.id, a.id)}
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer
                        ${a.isCorrect ? "border-primary bg-primary" : "border-gray-300 hover:border-primary/60"}`}
                    >
                      {a.isCorrect && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addA(q.id)}
                  className="text-primary text-xs font-medium text-right hover:underline cursor-pointer mt-1 self-end"
                >
                  + أضف إجابة أخرى
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQ}
        className="text-primary text-sm font-medium text-right hover:underline cursor-pointer self-end"
      >
        + أضف سؤالاً آخر
      </button>
    </div>
  );
};

// ─── Bootcamp form ───────────────────────────────────────────────────────────
const BootcampEditForm = ({ form, setForm }) => {
  const projects = form.projects || [];
  const addProject = () => setForm({ ...form, projects: [...projects, { id: crypto.randomUUID(), title: "", description: "", githubUrl: "", liveDemoUrl: "" }] });
  const removeProject = (id) => setForm({ ...form, projects: projects.filter(p => p.id !== id) });
  const updateProject = (id, field, value) => setForm({
    ...form,
    projects: projects.map(p => p.id === id ? { ...p, [field]: value } : p)
  });

  return (
    <div className="flex flex-col gap-4 py-2" dir="rtl">
      <Field label="اسم المحتوى" required>
        <TextInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </Field>
      
      <Field label="الوصف">
        <TextInput value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="وقت البدء">
          <TextInput type="time" value={form.timeStart || ""} onChange={e => setForm({ ...form, timeStart: e.target.value })} dir="ltr" />
        </Field>
        <Field label="وقت الانتهاء">
          <TextInput type="time" value={form.timeEnd || ""} onChange={e => setForm({ ...form, timeEnd: e.target.value })} dir="ltr" />
        </Field>
      </div>

      <Field label="المنطقة الزمنية">
        <select value={form.timezone || "Asia/Riyadh"} onChange={e => setForm({ ...form, timezone: e.target.value })} className="h-11 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white pt-0">
          <option value="Asia/Riyadh">Asia/Riyadh</option>
          <option value="Africa/Cairo">Africa/Cairo</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
          <option value="UTC">UTC</option>
        </select>
      </Field>

      <Field label="رابط البث المباشر">
        <TextInput value={form.liveSessionUrl || ""} onChange={e => setForm({ ...form, liveSessionUrl: e.target.value })} dir="ltr" />
      </Field>

      <Field label="رابط الفيديو المسجل">
        <TextInput value={form.videoUrl || ""} onChange={e => setForm({ ...form, videoUrl: e.target.value })} dir="ltr" />
      </Field>

      <div className="flex flex-col gap-3 py-2 border-t border-gray-100 pt-4 max-h-[30vh] overflow-y-auto pr-1">
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800 text-right">المشاريع التطبيقية</span>
            <button type="button" onClick={addProject} className="text-primary text-xs font-medium hover:underline cursor-pointer">+ أضف مشروع</button>
        </div>
        {projects.map((p, i) => (
          <div key={p.id} className="border border-gray-100 rounded-lg p-3 flex flex-col gap-3 bg-gray-50/50 relative">
            <button type="button" onClick={() => removeProject(p.id)} className="absolute top-2 left-2 text-gray-400 hover:text-red-500 cursor-pointer"><X className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-gray-500">مشروع {i + 1}</span>
            <TextInput value={p.title} onChange={e => updateProject(p.id, "title", e.target.value)} placeholder="اسم المشروع" />
            <TextInput value={p.description} onChange={e => updateProject(p.id, "description", e.target.value)} placeholder="الوصف" />
            <TextInput value={p.githubUrl} onChange={e => updateProject(p.id, "githubUrl", e.target.value)} placeholder="رابط GitHub" dir="ltr" />
            <TextInput value={p.liveDemoUrl} onChange={e => updateProject(p.id, "liveDemoUrl", e.target.value)} placeholder="رابط العرض الحي" dir="ltr" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── isValid helper ───────────────────────────────────────────────────────────

const isValid = (form, contentType) => {
  if (!form.title?.trim()) return false;
  if (contentType === "bootcamp") return true;

  switch (form.moduleType) {
    case "video":
      return !!form.videoUrl?.trim();
    case "link":
      return !!form.linkUrl?.trim() && !!form.linkDate?.trim();
    case "task":
      return !!form.taskUrl?.trim();
    case "quiz":
      return (
        form.questions?.length > 0 &&
        form.questions.every((q) => {
          if (!q.text?.trim()) return false;
          if (form.quizSubType === "mcq") {
            return (
              q.answers?.length >= 2 &&
              q.answers.every((a) => a.text?.trim()) &&
              q.answers.some((a) => a.isCorrect)
            );
          }
          return true;
        })
      );
    default:
      return false;
  }
};

// ─── Seed form from existing module data ──────────────────────────────────────

const seedForm = (item, contentType) => {
  const mod = item?.moduleData;
  const type = item?.type || mod?.moduleType || "video";

  if (contentType === "bootcamp") {
    return {
      moduleType: "bootcamp",
      title: item?.title || mod?.title || "",
      description: mod?.description || "",
      timeStart: mod?.timeStart || "",
      timeEnd: mod?.timeEnd || "",
      timezone: mod?.timezone || "Asia/Riyadh",
      liveSessionUrl: mod?.liveSession?.url || "",
      videoUrl: mod?.video?.url || "",
      projects: (mod?.projects || []).map(p => ({
        id: crypto.randomUUID(),
        title: p.title || "",
        description: p.description || "",
        githubUrl: p.githubUrl || "",
        liveDemoUrl: p.liveDemoUrl || ""
      }))
    };
  }

  const base = {
    moduleType: type,
    title: item?.title || mod?.title || "",
    description: mod?.description || "",
    videoUrl: mod?.video?.url || mod?.videoData?.url || "",
    linkUrl: mod?.link?.url || mod?.linkData?.url || "",
    linkDate: (mod?.link?.date || mod?.linkData?.date)
      ? new Date(mod?.link?.date || mod?.linkData?.date).toISOString().split("T")[0]
      : "",
    taskUrl: mod?.task?.url || mod?.taskData?.url || "",
    taskImageUrl: mod?.task?.imageUrl || mod?.taskData?.imageUrl || "",
    taskDescription: mod?.task?.description || mod?.taskData?.description || "",
    quizSubType: mod?.quizSubType || "mcq",
    questions: (mod?.quiz || mod?.quizData || []).map((q) => ({
      id: crypto.randomUUID(),
      text: q.question || "",
      answers: (q.options || []).map((opt) => ({
        id: crypto.randomUUID(),
        text: opt,
        isCorrect: opt === q.answer,
      })),
    })),
  };
  return base;
};

// ─── TYPE label ───────────────────────────────────────────────────────────────
const TYPE_LABEL = {
  video: "فيديو",
  link: "رابط",
  task: "ملف",
  quiz: "اختبار",
};

// ─── Main dialog ──────────────────────────────────────────────────────────────
const EditModuleDialog = ({
  open,
  onOpenChange,
  item,
  onSave,
  isSaving = false,
  contentType = "course"
}) => {
  const [form, setForm] = useState(() => seedForm(item, contentType));

  // Re-seed whenever the target item changes
  useEffect(() => {
    if (open && item) setForm(seedForm(item, contentType));
  }, [open, item, contentType]);

  const handleSave = () => {
    onSave(form);
  };

  const typeLabel = contentType === "bootcamp" ? "محتوى المعسكر" : (TYPE_LABEL[form.moduleType] ?? form.moduleType);

  const renderForm = () => {
    if (contentType === "bootcamp") {
      return <BootcampEditForm form={form} setForm={setForm} />;
    }
    switch (form.moduleType) {
      case "video":
        return <VideoEditForm form={form} setForm={setForm} />;
      case "link":
        return <LinkEditForm form={form} setForm={setForm} />;
      case "task":
        return <TaskEditForm form={form} setForm={setForm} />;
      case "quiz":
        return <QuizEditForm form={form} setForm={setForm} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={form.moduleType === "quiz" ? "sm:max-w-lg" : "sm:max-w-md"}
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-gray-900">
            تعديل المحتوى — {typeLabel}
          </DialogTitle>
        </DialogHeader>

        {renderForm()}

        <div className="flex justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full px-6 border-gray-300 text-gray-700 cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isValid(form, contentType)}
            className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModuleDialog;
