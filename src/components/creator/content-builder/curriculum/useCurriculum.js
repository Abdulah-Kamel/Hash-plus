"use client";
import { useState, useCallback, useEffect } from "react";
import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
  createBootcampSection,
  updateBootcampSection,
  deleteBootcampSection,
  createBootcampSectionModule,
  updateBootcampSectionModule,
  deleteBootcampSectionModule,
} from "@/actions/moduleActions";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────

const createDefaultSection = (title, items = [], apiId = null) => ({
  id: apiId || `section-${Date.now()}-${Math.random()}`,
  apiId,           // real backend _id — needed for nested module calls
  title,
  isEditing: false,
  items,
  showForm: false,
  formType: null,
});

// Map a raw API module into a section item
const toItem = (mod) => ({
  id: mod._id || `item-${Math.random()}`,
  type: mod.moduleType || "video",
  title: mod.title,
  moduleData: mod,
});

// Map a raw API bootcamp section into the local section shape
const toBootcampSection = (section) => ({
  ...createDefaultSection(section.title, (section.modules || []).map(toItem), section._id),
  sectionData: section,
});

// ─── Hook ─────────────────────────────────────────────────────

export function useCurriculum(contentId, contentType = "course", modules = [], onModulesChange) {
  const isBootcamp = contentType === "bootcamp";

  const [sections, setSections] = useState(() => {
    if (isBootcamp) {
      // modules prop for bootcamps should be an array of section objects
      // each containing { _id, title, modules: [...] }
      if (modules?.length && modules[0]?.modules !== undefined) {
        return modules.map(toBootcampSection);
      }
      return [createDefaultSection("القسم الأول")];
    }
    // Course: flat modules go into a single default section
    return [createDefaultSection("القسم الأول", modules.map(toItem))];
  });

  // Sync when modules prop refreshes from API
  useEffect(() => {
    if (isBootcamp) {
      if (modules?.length && modules[0]?.modules !== undefined) {
        setSections(modules.map(toBootcampSection));
      } else {
        setSections([createDefaultSection("القسم الأول")]);
      }
    } else {
      setSections([createDefaultSection("القسم الأول", modules.map(toItem))]);
    }
  }, [modules, contentType]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [isSavingForm, setIsSavingForm] = useState(false);

  const [dialogState, setDialogState] = useState({
    open: false,
    sectionId: null,
    formData: { title: "" },
  });

  const [editDialogState, setEditDialogState] = useState({
    open: false,
    sectionId: null,
    item: null,
    isSaving: false,
  });

  // ─── Section CRUD ──────────────────────────────────────────

  const addSection = useCallback(async () => {
    const newTitle = `القسم ${sections.length + 1}`;
    setIsCreatingSection(true);

    try {
      if (isBootcamp) {
        const res = await createBootcampSection(contentId, { title: newTitle });
        if (res.success) {
          const apiSection = res.data?.data;
          setSections((prev) => [...prev, createDefaultSection(newTitle, [], apiSection?._id)]);
          toast.success("تم إضافة القسم بنجاح");
          onModulesChange?.();
        } else {
          toast.error(res.error || "فشل إضافة القسم");
        }
      } else {
        const res = await createCourseModule(contentId, { moduleType: "video", title: newTitle });
        if (res.success) {
          setSections((prev) => [...prev, createDefaultSection(newTitle)]);
          toast.success("تم إضافة القسم بنجاح");
          onModulesChange?.();
        } else {
          toast.error(res.error || "فشل إضافة القسم");
        }
      }
    } catch {
      setSections((prev) => [...prev, createDefaultSection(newTitle)]);
      toast.error("حدث خطأ أثناء إضافة القسم");
    }

    setIsCreatingSection(false);
  }, [contentId, isBootcamp, sections.length, onModulesChange]);

  const deleteSection = useCallback(
    async (sectionId) => {
      const section = sections.find((s) => s.id === sectionId);
      try {
        if (isBootcamp && section?.apiId) {
          await deleteBootcampSection(contentId, section.apiId);
        } else if (!isBootcamp && section?.apiId) {
          await deleteCourseModule(contentId, section.apiId);
        }
        toast.success("تم حذف القسم");
      } catch {
        toast.error("فشل حذف القسم");
      }
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      setOpenMenuId(null);
      onModulesChange?.();
    },
    [contentId, isBootcamp, sections, onModulesChange]
  );

  // ─── Title editing ─────────────────────────────────────────

  const toggleEdit = useCallback((sectionId) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, isEditing: !s.isEditing } : s))
    );
    setOpenMenuId(null);
  }, []);

  const updateTitle = useCallback((sectionId, newTitle) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title: newTitle } : s))
    );
  }, []);

  const saveTitle = useCallback(
    async (sectionId) => {
      const section = sections.find((s) => s.id === sectionId);
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? { ...s, isEditing: false } : s))
      );
      if (!section?.apiId) return;
      try {
        if (isBootcamp) {
          await updateBootcampSection(contentId, section.apiId, { title: section.title });
        } else {
          await updateCourseModule(contentId, section.apiId, { title: section.title });
        }
      } catch {
        console.error("Failed to update section title");
      }
    },
    [contentId, isBootcamp, sections]
  );

  // ─── Add-content dialog ────────────────────────────────────

  const openAddDialog = useCallback((sectionId) => {
    setDialogState({ open: true, sectionId, formData: { title: "" } });
  }, []);

  const closeAddDialog = useCallback(() => {
    setDialogState({ open: false, sectionId: null, formData: { title: "" } });
  }, []);

  const saveDialogForm = useCallback(
    async (form) => {
      const {
        title, description, moduleType,
        videoUrl, linkUrl, linkDate,
        taskUrl, taskImageUrl, taskDescription,
        quizSubType, questions,
        // live session fields
        liveStartTime, liveEndTime, liveTimezone, liveDate, liveMeetLink, liveStreamUrl,
      } = form;
      const { sectionId } = dialogState;
      if (!title?.trim()) {
        toast.error("يرجى إدخال اسم المحتوى");
        return;
      }

      const type = moduleType || "video";

      // Validation for course only
      if (!isBootcamp) {
        if (type === "video" && !videoUrl?.trim()) { toast.error("يرجى إدخال رابط الفيديو"); return; }
        if (type === "link" && !linkUrl?.trim()) { toast.error("يرجى إدخال الرابط"); return; }
        if (type === "link" && !linkDate?.trim()) { toast.error("يرجى إدخال التاريخ"); return; }
        if (type === "task" && !taskUrl?.trim()) { toast.error("يرجى إدخال رابط التكليف"); return; }
        if (type === "quiz" && !quizSubType) { toast.error("يرجى اختيار نوع الاختبار"); return; }
      }

      setIsSavingForm(true);
      try {
        let res;

        if (isBootcamp) {
          // Find the section's backend apiId
          const section = sections.find((s) => s.id === sectionId);
          const apiSectionId = section?.apiId;
          if (!apiSectionId) {
            toast.error("لم يتم حفظ القسم بعد على الخادم، يرجى حفظه أولاً");
            setIsSavingForm(false);
            return;
          }

          const payload = { moduleType: type, title };
          if (description?.trim()) payload.description = description.trim();

          if (type === "video" && videoUrl?.trim()) {
            payload.videoData = { url: videoUrl.trim() };
          }
          if (type === "link") {
            payload.linkData = { url: linkUrl?.trim(), date: linkDate?.trim() };
          }
          if (type === "task") {
            payload.taskData = {
              url: taskUrl?.trim(),
              ...(taskImageUrl?.trim() && { imageUrl: taskImageUrl.trim() }),
              ...(taskDescription?.trim() && { description: taskDescription.trim() }),
            };
          }
          if (type === "quiz") {
            payload.quizData = (questions || []).map((q) => {
              const item = { question: q.text };
              if (quizSubType === "mcq" && q.answers?.length) {
                item.options = q.answers.map((a) => a.text);
                const correct = q.answers.find((a) => a.isCorrect);
                if (correct) item.answer = correct.text;
              }
              return item;
            });
          }
          if (type === "liveSession") {
            payload.liveSessionData = {
              startTime: liveStartTime || "",
              endTime: liveEndTime || "",
              timezone: liveTimezone || "Asia/Riyadh",
              date: liveDate || "",
              meetLink: liveMeetLink || "",
              liveStreamUrl: liveStreamUrl || "",
            };
          }

          res = await createBootcampSectionModule(contentId, apiSectionId, payload);
        } else {
          // Course module
          const payload = { moduleType: type, title };
          if (description?.trim()) payload.description = description.trim();
          if (type === "video" && videoUrl?.trim()) payload.videoData = { url: videoUrl.trim() };
          if (type === "link") payload.linkData = { url: linkUrl.trim(), date: linkDate.trim() };
          if (type === "task") {
            payload.taskData = {
              url: taskUrl.trim(),
              ...(taskImageUrl?.trim() && { imageUrl: taskImageUrl.trim() }),
              ...(taskDescription?.trim() && { description: taskDescription.trim() }),
            };
          }
          if (type === "quiz") {
            payload.quizData = (questions || []).map((q) => {
              const item = { question: q.text };
              if (quizSubType === "mcq" && q.answers?.length) {
                item.options = q.answers.map((a) => a.text);
                const correct = q.answers.find((a) => a.isCorrect);
                if (correct) item.answer = correct.text;
              }
              return item;
            });
          }
          res = await createCourseModule(contentId, payload);
        }

        if (res.success) {
          const newModule = res.data?.data;
          setSections((prev) =>
            prev.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: [
                      ...s.items,
                      {
                        id: newModule?._id || `item-${Date.now()}`,
                        type,
                        title,
                        moduleData: newModule,
                      },
                    ],
                  }
                : s
            )
          );
          closeAddDialog();
          toast.success("تم إضافة المحتوى بنجاح");
          onModulesChange?.();
        } else {
          toast.error(res.error || "فشل إضافة المحتوى");
        }
      } catch {
        toast.error("فشل إضافة المحتوى");
      }
      setIsSavingForm(false);
    },
    [contentId, isBootcamp, sections, dialogState, closeAddDialog, onModulesChange]
  );

  // ─── Edit dialog ───────────────────────────────────────────

  const openEditDialog = useCallback((sectionId, item) => {
    setEditDialogState({ open: true, sectionId, item, isSaving: false });
  }, []);

  const closeEditDialog = useCallback(() => {
    setEditDialogState({ open: false, sectionId: null, item: null, isSaving: false });
  }, []);

  const saveEditForm = useCallback(
    async (form) => {
      const { sectionId, item } = editDialogState;
      const moduleId = item?.moduleData?._id;
      if (!moduleId) { toast.error("لا يمكن تعديل هذا المحتوى"); return; }

      setEditDialogState((prev) => ({ ...prev, isSaving: true }));
      try {
        const {
          moduleType: type, title, description,
          videoUrl, linkUrl, linkDate,
          taskUrl, taskImageUrl, taskDescription,
          quizSubType, questions,
          liveStartTime, liveEndTime, liveTimezone, liveDate, liveMeetLink, liveStreamUrl,
        } = form;

        let res;

        if (isBootcamp) {
          const section = sections.find((s) => s.id === sectionId);
          const apiSectionId = section?.apiId;
          if (!apiSectionId) { toast.error("القسم غير محفوظ على الخادم"); return; }

          const payload = { title };
          if (description?.trim()) payload.description = description.trim();
          if (type === "video" && videoUrl?.trim()) payload.videoData = { url: videoUrl.trim() };
          if (type === "link") payload.linkData = { url: linkUrl?.trim(), date: linkDate?.trim() };
          if (type === "task") {
            payload.taskData = {
              url: taskUrl?.trim(),
              ...(taskImageUrl?.trim() && { imageUrl: taskImageUrl.trim() }),
              ...(taskDescription?.trim() && { description: taskDescription.trim() }),
            };
          }
          if (type === "quiz") {
            payload.quizData = (questions || []).map((q) => {
              const qItem = { question: q.text };
              if (quizSubType === "mcq" && q.answers?.length) {
                qItem.options = q.answers.map((a) => a.text);
                const correct = q.answers.find((a) => a.isCorrect);
                if (correct) qItem.answer = correct.text;
              }
              return qItem;
            });
          }
          if (type === "liveSession") {
            payload.liveSessionData = {
              startTime: liveStartTime || "",
              endTime: liveEndTime || "",
              timezone: liveTimezone || "Asia/Riyadh",
              date: liveDate || "",
              meetLink: liveMeetLink || "",
              liveStreamUrl: liveStreamUrl || "",
            };
          }

          res = await updateBootcampSectionModule(contentId, apiSectionId, moduleId, payload);
        } else {
          const payload = { title };
          if (description?.trim()) payload.description = description.trim();
          if (type === "video" && videoUrl?.trim()) payload.videoData = { url: videoUrl.trim() };
          if (type === "link") payload.linkData = { url: linkUrl?.trim(), date: linkDate?.trim() };
          if (type === "task") {
            payload.taskData = {
              url: taskUrl?.trim(),
              ...(taskImageUrl?.trim() && { imageUrl: taskImageUrl.trim() }),
              ...(taskDescription?.trim() && { description: taskDescription.trim() }),
            };
          }
          if (type === "quiz") {
            payload.quizData = (questions || []).map((q) => {
              const qItem = { question: q.text };
              if (quizSubType === "mcq" && q.answers?.length) {
                qItem.options = q.answers.map((a) => a.text);
                const correct = q.answers.find((a) => a.isCorrect);
                if (correct) qItem.answer = correct.text;
              }
              return qItem;
            });
          }
          res = await updateCourseModule(contentId, moduleId, payload);
        }

        if (res.success) {
          setSections((prev) =>
            prev.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === item.id
                        ? { ...i, title, moduleData: res.data?.data || { ...i.moduleData } }
                        : i
                    ),
                  }
                : s
            )
          );
          closeEditDialog();
          toast.success("تم تعديل المحتوى بنجاح");
          onModulesChange?.();
        } else {
          toast.error(res.error || "فشل تعديل المحتوى");
        }
      } catch {
        toast.error("فشل تعديل المحتوى");
      }
      setEditDialogState((prev) => ({ ...prev, isSaving: false }));
    },
    [contentId, isBootcamp, sections, editDialogState, closeEditDialog, onModulesChange]
  );

  // ─── Item deletion ─────────────────────────────────────────

  const deleteItem = useCallback(
    async (sectionId, itemId, moduleId) => {
      if (moduleId) {
        try {
          if (isBootcamp) {
            const section = sections.find((s) => s.id === sectionId);
            const apiSectionId = section?.apiId;
            if (apiSectionId) {
              await deleteBootcampSectionModule(contentId, apiSectionId, moduleId);
            }
          } else {
            await deleteCourseModule(contentId, moduleId);
          }
          toast.success("تم حذف المحتوى");
        } catch {
          toast.error("فشل حذف المحتوى");
        }
      }
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId
            ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
            : s
        )
      );
      onModulesChange?.();
    },
    [contentId, isBootcamp, sections, onModulesChange]
  );

  return {
    sections,
    openMenuId,
    setOpenMenuId,
    isCreatingSection,
    isSavingForm,
    dialogState,
    editDialogState,
    addSection,
    deleteSection,
    toggleEdit,
    updateTitle,
    saveTitle,
    openAddDialog,
    closeAddDialog,
    saveDialogForm,
    openEditDialog,
    closeEditDialog,
    saveEditForm,
    deleteItem,
  };
}
