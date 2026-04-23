"use client";
import React, { useState } from "react";
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

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT_TYPES = [
  { id: "video", label: "فيديو",   icon: Video },
  { id: "link",  label: "رابط",    icon: Link },
  { id: "task",  label: "ملف",     icon: FileText },
  { id: "quiz",  label: "اختبار",  icon: ClipboardList },
];

const QUIZ_SUBTYPES = [
  {
    id: "mcq",
    label: "اختيارات",
    description: "أسئلة متعددة الخيارات",
    icon: ListChecks,
  },
  {
    id: "writing",
    label: "مقالي",
    description: "أسئلة إجابة مفتوحة",
    icon: PenLine,
  },
];

const STEP = { TYPE: "type", QUIZ_TYPE: "quiz_type", FORM: "form" };
const EMPTY_FORM = {
  title: "",
  description: "",
  videoUrl: "",
  linkUrl: "",
  linkDate: "",
  taskUrl: "",
  taskImageUrl: "",
  taskDescription: "",
  questions: [],
};

// Helpers to create blank question / answer objects
const mkAnswer   = ()   => ({ id: crypto.randomUUID(), text: "", isCorrect: false });
const mkQuestion = (isMcq) => ({
  id: crypto.randomUUID(),
  text: "",
  answers: isMcq ? [mkAnswer(), mkAnswer()] : [],
});

const typeLabel = (type) =>
  CONTENT_TYPES.find((t) => t.id === type)?.label ?? type;

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Content type picker
// ─────────────────────────────────────────────────────────────────────────────
const TypeSelector = ({ selected, onSelect }) => (
  <div className="grid grid-cols-2 gap-3 py-2" dir="rtl">
    {CONTENT_TYPES.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        type="button"
        onClick={() => onSelect(id)}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 py-5 transition-all cursor-pointer
          ${
            selected === id
              ? "border-primary bg-primary/5 text-primary"
              : "border-gray-200 text-gray-500 hover:border-primary/40 hover:bg-gray-50"
          }`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Step 1.5 — Quiz subtype picker (MCQ vs Writing)
// ─────────────────────────────────────────────────────────────────────────────
const QuizTypeSelector = ({ selected, onSelect }) => (
  <div className="flex flex-col gap-3 py-2" dir="rtl">
    {QUIZ_SUBTYPES.map(({ id, label, description, icon: Icon }) => (
      <button
        key={id}
        type="button"
        onClick={() => onSelect(id)}
        className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all cursor-pointer text-right
          ${
            selected === id
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/40 hover:bg-gray-50"
          }`}
      >
        {/* Icon box */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
            ${selected === id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"}`}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Labels */}
        <div className="flex-1">
          <p
            className={`text-sm font-semibold ${
              selected === id ? "text-primary" : "text-gray-900"
            }`}
          >
            {label}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>

        {/* Selection indicator */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors flex items-center justify-center
            ${selected === id ? "border-primary bg-primary" : "border-gray-300"}`}
        >
          {selected === id && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Forms per content type
// ─────────────────────────────────────────────────────────────────────────────
const TitleField = ({ value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-800 text-right">
      اسم المحتوى <span className="text-red-500">*</span>
    </label>
    <Input
      value={value}
      onChange={onChange}
      placeholder="مثال: مقدمة إلى التصميم"
      className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
      dir="rtl"
      autoFocus
    />
  </div>
);

const VideoForm = ({ formData, onChange }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <TitleField
      value={formData.title}
      onChange={(e) => onChange({ ...formData, title: e.target.value })}
    />
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        رابط الفيديو <span className="text-red-500">*</span>
      </label>
      <Input
        value={formData.videoUrl || ""}
        onChange={(e) => onChange({ ...formData, videoUrl: e.target.value })}
        placeholder="https://www.youtube.com/watch?v=..."
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="rtl"
      />
      <p className="text-xs text-gray-400 text-right">
        رابط YouTube أو Vimeo أو رابط فيديو مباشر
      </p>
    </div>
  </div>
);

const LinkForm = ({ formData, onChange }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <TitleField
      value={formData.title}
      onChange={(e) => onChange({ ...formData, title: e.target.value })}
    />
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        الوصف
      </label>
      <Input
        value={formData.description || ""}
        onChange={(e) => onChange({ ...formData, description: e.target.value })}
        placeholder="وصف مختصر للرابط"
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="rtl"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        الرابط <span className="text-red-500">*</span>
      </label>
      <Input
        value={formData.linkUrl || ""}
        onChange={(e) => onChange({ ...formData, linkUrl: e.target.value })}
        placeholder="https://..."
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="ltr"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        التاريخ <span className="text-red-500">*</span>
      </label>
      <Input
        type="date"
        value={formData.linkDate || ""}
        onChange={(e) => onChange({ ...formData, linkDate: e.target.value })}
        className="h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="ltr"
      />
    </div>
  </div>
);

const TaskForm = ({ formData, onChange }) => (
  <div className="flex flex-col gap-4 py-2" dir="rtl">
    <TitleField
      value={formData.title}
      onChange={(e) => onChange({ ...formData, title: e.target.value })}
    />
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        الوصف
      </label>
      <Input
        value={formData.taskDescription || ""}
        onChange={(e) => onChange({ ...formData, taskDescription: e.target.value })}
        placeholder="وصف التكليف"
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="rtl"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        رابط التكليف <span className="text-red-500">*</span>
      </label>
      <Input
        value={formData.taskUrl || ""}
        onChange={(e) => onChange({ ...formData, taskUrl: e.target.value })}
        placeholder="https://..."
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="ltr"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800 text-right">
        رابط الصورة
      </label>
      <Input
        value={formData.taskImageUrl || ""}
        onChange={(e) => onChange({ ...formData, taskImageUrl: e.target.value })}
        placeholder="https://...image.png"
        className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
        dir="ltr"
      />
    </div>
  </div>
);

// ─── Bootcamp form ───────────────────────────────────────────────────────────
const BootcampForm = ({ formData, onChange }) => {
  const projects = formData.projects || [];
  const addProject = () => onChange({ ...formData, projects: [...projects, { id: crypto.randomUUID(), title: "", description: "", githubUrl: "", liveDemoUrl: "" }] });
  const removeProject = (id) => onChange({ ...formData, projects: projects.filter(p => p.id !== id) });
  const updateProject = (id, field, value) => onChange({
    ...formData,
    projects: projects.map(p => p.id === id ? { ...p, [field]: value } : p)
  });

  return (
    <div className="flex flex-col gap-4 py-2" dir="rtl">
      <TitleField value={formData.title} onChange={(e) => onChange({ ...formData, title: e.target.value })} />
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-800 text-right">الوصف</label>
        <Input value={formData.description || ""} onChange={e => onChange({ ...formData, description: e.target.value })} className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary" dir="rtl" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-800 text-right">وقت البدء</label>
          <Input type="time" value={formData.timeStart || ""} onChange={e => onChange({ ...formData, timeStart: e.target.value })} className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary" dir="ltr" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-800 text-right">وقت الانتهاء</label>
          <Input type="time" value={formData.timeEnd || ""} onChange={e => onChange({ ...formData, timeEnd: e.target.value })} className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary" dir="ltr" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-800 text-right">المنطقة الزمنية</label>
        <select value={formData.timezone || "Asia/Riyadh"} onChange={e => onChange({ ...formData, timezone: e.target.value })} className="h-11 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white pt-0">
          <option value="Asia/Riyadh">Asia/Riyadh</option>
          <option value="Africa/Cairo">Africa/Cairo</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-800 text-right">رابط البث المباشر</label>
        <Input value={formData.liveSessionUrl || ""} onChange={e => onChange({ ...formData, liveSessionUrl: e.target.value })} placeholder="https://zoom.us/..." className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary" dir="ltr" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-800 text-right">رابط الفيديو المسجل</label>
        <Input value={formData.videoUrl || ""} onChange={e => onChange({ ...formData, videoUrl: e.target.value })} placeholder="https://youtube.com/..." className="text-right h-11 border-gray-200 rounded-lg focus-visible:ring-primary" dir="ltr" />
      </div>

      <div className="flex flex-col gap-3 py-2 border-t border-gray-100 pt-4 max-h-[25vh] overflow-y-auto pr-1">
        <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-800 text-right">المشاريع التطبيقية</label>
            <button type="button" onClick={addProject} className="text-primary text-xs font-medium hover:underline cursor-pointer">+ أضف مشروع</button>
        </div>
        {projects.map((p, i) => (
          <div key={p.id} className="border border-gray-100 rounded-lg p-3 flex flex-col gap-3 bg-gray-50/50 relative">
            <button type="button" onClick={() => removeProject(p.id)} className="absolute top-2 left-2 text-gray-400 hover:text-red-500 cursor-pointer"><X className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-gray-500">مشروع {i + 1}</span>
            <Input value={p.title} onChange={e => updateProject(p.id, "title", e.target.value)} placeholder="اسم المشروع" className="h-9 bg-white border-gray-200" />
            <Input value={p.description} onChange={e => updateProject(p.id, "description", e.target.value)} placeholder="الوصف" className="h-9 bg-white border-gray-200" />
            <Input value={p.githubUrl} onChange={e => updateProject(p.id, "githubUrl", e.target.value)} placeholder="رابط GitHub" className="h-9 bg-white border-gray-200" dir="ltr" />
            <Input value={p.liveDemoUrl} onChange={e => updateProject(p.id, "liveDemoUrl", e.target.value)} placeholder="رابط العرض الحي" className="h-9 bg-white border-gray-200" dir="ltr" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Quiz form — full question builder ───────────────────────────────────────
const QuizForm = ({ formData, onChange, quizSubType }) => {
  const isMcq      = quizSubType === "mcq";
  const questions  = formData.questions?.length ? formData.questions : [mkQuestion(isMcq)];

  const update = (qs) => onChange({ ...formData, questions: qs });

  // Question helpers
  const addQuestion = () => update([...questions, mkQuestion(isMcq)]);
  const removeQuestion = (qId) => update(questions.filter((q) => q.id !== qId));
  const updateQText = (qId, text) =>
    update(questions.map((q) => (q.id === qId ? { ...q, text } : q)));

  // Answer helpers (MCQ only)
  const addAnswer = (qId) =>
    update(
      questions.map((q) =>
        q.id === qId ? { ...q, answers: [...q.answers, mkAnswer()] } : q
      )
    );
  const removeAnswer = (qId, aId) =>
    update(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: q.answers.filter((a) => a.id !== aId) }
          : q
      )
    );
  const updateAnswerText = (qId, aId, text) =>
    update(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: q.answers.map((a) => (a.id === aId ? { ...a, text } : a)) }
          : q
      )
    );
  const setCorrect = (qId, aId) =>
    update(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: q.answers.map((a) => ({ ...a, isCorrect: a.id === aId })) }
          : q
      )
    );

  return (
    <div className="flex flex-col gap-4 py-2" dir="rtl">
      {/* Module title */}
      <TitleField
        value={formData.title}
        onChange={(e) => onChange({ ...formData, questions, title: e.target.value })}
      />

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Questions */}
      <div className="flex flex-col gap-5 max-h-[46vh] overflow-y-auto pr-1">
        {questions.map((q, qi) => (
          <div key={q.id} className="flex flex-col gap-3">
            {/* Question header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => removeQuestion(q.id)}
                disabled={questions.length === 1}
                className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-gray-500">
                السؤال {qi + 1}
              </span>
            </div>

            {/* Question text */}
            <Input
              value={q.text}
              onChange={(e) => updateQText(q.id, e.target.value)}
              placeholder={isMcq ? "ما هو..." : "اكتب سؤالك هنا..."}
              className="text-right h-10 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary text-sm"
              dir="rtl"
            />

            {/* MCQ answers */}
            {isMcq && (
              <div className="flex flex-col gap-2 pr-2 border-r-2 border-gray-100">
                <span className="text-xs text-gray-500 text-right">الإجابات</span>

                {q.answers.map((a) => (
                  <div key={a.id} className="flex items-center gap-2">
                    {/* Delete answer */}
                    <button
                      type="button"
                      onClick={() => removeAnswer(q.id, a.id)}
                      disabled={q.answers.length <= 2}
                      className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-0 cursor-pointer flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Answer text */}
                    <Input
                      value={a.text}
                      onChange={(e) => updateAnswerText(q.id, a.id, e.target.value)}
                      placeholder="أدخل إجابة..."
                      className="flex-1 text-right h-9 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary text-sm"
                      dir="rtl"
                    />

                    {/* Correct toggle */}
                    <button
                      type="button"
                      onClick={() => setCorrect(q.id, a.id)}
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer
                        ${a.isCorrect
                          ? "border-primary bg-primary"
                          : "border-gray-300 hover:border-primary/60"}`}
                    >
                      {a.isCorrect && <div className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  </div>
                ))}

                {/* Add answer */}
                <button
                  type="button"
                  onClick={() => addAnswer(q.id)}
                  className="text-primary text-xs font-medium text-right hover:underline cursor-pointer mt-1 self-end"
                >
                  + أضف إجابة أخرى
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add question */}
      <button
        type="button"
        onClick={addQuestion}
        className="text-primary text-sm font-medium text-right hover:underline cursor-pointer self-end"
      >
        + أضف سؤالاً آخر
      </button>
    </div>
  );
};

// Dispatcher
const ContentForm = ({ formData, onChange, selectedType, quizSubType, contentType }) => {
  if (contentType === "bootcamp") {
    return <BootcampForm formData={formData} onChange={onChange} />;
  }

  switch (selectedType) {
    case "video": return <VideoForm formData={formData} onChange={onChange} />;
    case "link":  return <LinkForm  formData={formData} onChange={onChange} />;
    case "task":  return <TaskForm  formData={formData} onChange={onChange} />;
    case "quiz":  return <QuizForm  formData={formData} onChange={onChange} quizSubType={quizSubType} />;
    default:      return <QuizForm  formData={formData} onChange={onChange} quizSubType={quizSubType} />;
  }
};

// Validation
const isQuizValid = (formData, quizSubType) => {
  const questions = formData.questions;
  if (!questions?.length) return false;
  return questions.every((q) => {
    if (!q.text.trim()) return false;
    if (quizSubType === "mcq") {
      if (q.answers.length < 2) return false;
      if (!q.answers.every((a) => a.text.trim())) return false;
      if (!q.answers.some((a) => a.isCorrect)) return false;
    }
    return true;
  });
};

const isFormValid = (formData, type, quizSubType, contentType) => {
  if (!formData.title.trim()) return false;
  
  if (contentType === "bootcamp") return true;

  if (type === "video") return !!formData.videoUrl?.trim();
  if (type === "link")  return !!formData.linkUrl?.trim() && !!formData.linkDate?.trim();
  if (type === "task")  return !!formData.taskUrl?.trim();
  if (type === "quiz")  return isQuizValid(formData, quizSubType);
  return true;
};

// ─────────────────────────────────────────────────────────────────────────────
// Main dialog
// ─────────────────────────────────────────────────────────────────────────────
const AddContentDialog = ({
  open,
  onOpenChange,
  onSave,
  isSaving = false,
  initialType = null,
  contentType = "course"
}) => {
  const [step, setStep] = useState(initialType || contentType === "bootcamp" ? STEP.FORM : STEP.TYPE);
  const [selectedType, setSelectedType] = useState(initialType ?? "video");
  const [quizSubType, setQuizSubType] = useState("mcq");
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Reset when dialog re-opens
  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      setStep((initialType || contentType === "bootcamp") ? STEP.FORM : STEP.TYPE);
      setSelectedType(initialType ?? "video");
      setQuizSubType("mcq");
      setFormData(EMPTY_FORM);
    }
    onOpenChange(isOpen);
  };

  const handleTypeConfirm = () => {
    setFormData(EMPTY_FORM);
    // Quiz gets an extra sub-type selection step
    if (selectedType === "quiz") {
      setStep(STEP.QUIZ_TYPE);
    } else {
      setStep(STEP.FORM);
    }
  };

  const handleQuizTypeConfirm = () => {
    setStep(STEP.FORM);
  };

  const handleBack = () => {
    if (step === STEP.FORM && selectedType === "quiz") {
      setStep(STEP.QUIZ_TYPE);
    } else if (step === STEP.QUIZ_TYPE) {
      setStep(STEP.TYPE);
    } else {
      setStep(STEP.TYPE);
    }
    setFormData(EMPTY_FORM);
  };

  const handleSave = () => {
    onSave({
      ...formData,
      moduleType: selectedType,
      quizSubType: selectedType === "quiz" ? quizSubType : undefined,
    });
  };

  const dialogTitle = () => {
    if (contentType === "bootcamp") return "إضافة محتوى للمعسكر";
    if (step === STEP.TYPE)      return "اختر نوع المحتوى";
    if (step === STEP.QUIZ_TYPE) return "اختر نوع الاختبار";
    return `إضافة محتوى — ${typeLabel(selectedType)}`;
  };

  const canSave = !isSaving && isFormValid(formData, selectedType, quizSubType, contentType);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`${
          step === STEP.FORM && selectedType === "quiz"
            ? "sm:max-w-lg"
            : "sm:max-w-md"
        }`}
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-gray-900">
            {dialogTitle()}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Content type selector */}
        {step === STEP.TYPE && (
          <>
            <TypeSelector selected={selectedType} onSelect={setSelectedType} />
            <div className="flex justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="rounded-full px-6 border-gray-300 text-gray-700 cursor-pointer"
              >
                إلغاء
              </Button>
              <Button
                type="button"
                onClick={handleTypeConfirm}
                className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer"
              >
                التالي
              </Button>
            </div>
          </>
        )}

        {/* Step 1.5: Quiz subtype (MCQ vs Writing) */}
        {step === STEP.QUIZ_TYPE && (
          <>
            <QuizTypeSelector selected={quizSubType} onSelect={setQuizSubType} />
            <div className="flex justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="rounded-full px-6 border-gray-300 text-gray-700 cursor-pointer"
              >
                رجوع
              </Button>
              <Button
                type="button"
                onClick={handleQuizTypeConfirm}
                className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer"
              >
                التالي
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Form for the selected content type */}
        {step === STEP.FORM && (
          <>
            <ContentForm
              formData={formData}
              onChange={setFormData}
              selectedType={selectedType}
              quizSubType={quizSubType}
              contentType={contentType}
            />
            <div className="flex justify-between gap-3 pt-2">
              {contentType === "course" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-full px-6 border-gray-300 text-gray-700 cursor-pointer"
                >
                  رجوع
                </Button>
              )}
              {contentType === "bootcamp" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="rounded-full px-6 border-gray-300 text-gray-700 cursor-pointer"
                >
                  إلغاء
                </Button>
              )}
              <Button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddContentDialog;
