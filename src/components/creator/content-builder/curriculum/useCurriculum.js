"use client";
import { useState, useCallback, useEffect } from "react";
import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
  createBootcampModule,
  deleteBootcampModule,
  updateBootcampModule,
} from "@/actions/moduleActions";
import { toast } from "sonner";

const createDefaultSection = (title, items = []) => ({
  id: `section-${Date.now()}-${Math.random()}`,
  title,
  isEditing: false,
  items,
  showForm: false,
  formType: null,
});

// Map a raw API module into a section item
const toItem = (mod) => ({
  id: mod._id || `item-${Math.random()}`,
  type: mod.moduleType,
  title: mod.title,
  moduleData: mod,
});

export function useCurriculum(contentId, contentType = "course", modules = [], onModulesChange) {
  const [sections, setSections] = useState(() => {
    // All API modules are flat items — load them into one default section
    const items = modules.map(toItem);
    return [createDefaultSection("القسم الأول", items)];
  });

  // Sync sections when modules prop updates from API
  useEffect(() => {
    setSections((prevSections) => {
      // If we already have modules and we're just syncing, preserve section IDs
      // but if we're doing a total reload, re-build the default section.
      // Currently making it simple: just override the single section.
      const items = modules.map(toItem);
      return [createDefaultSection("القسم الأول", items)];
    });
  }, [modules]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [isSavingForm, setIsSavingForm] = useState(false);

  // Add-content dialog state
  const [dialogState, setDialogState] = useState({
    open: false,
    sectionId: null,
    formData: { title: "" },
  });

  // Edit-module dialog state
  const [editDialogState, setEditDialogState] = useState({
    open: false,
    sectionId: null,
    item: null,
    isSaving: false,
  });

  // --- Section CRUD ---

  const addSection = useCallback(async () => {
    const newTitle = `القسم ${sections.length + 1}`;
    setIsCreatingSection(true);

    try {
      const isBootcamp = contentType === "bootcamp";
      const payload = isBootcamp ? { title: newTitle } : { moduleType: "video", title: newTitle };
      
      const res = isBootcamp 
        ? await createBootcampModule(contentId, payload)
        : await createCourseModule(contentId, payload);

      const moduleData = res.success ? res.data?.data : null;
      setSections((prev) => [...prev, createDefaultSection(newTitle, moduleData)]);

      if (res.success) {
        toast.success("تم إضافة القسم بنجاح");
        onModulesChange?.();
      } else {
        toast.error(res.error || "فشل إضافة القسم في الخادم");
      }
    } catch {
      setSections((prev) => [...prev, createDefaultSection(newTitle)]);
    }

    setIsCreatingSection(false);
  }, [contentId, sections.length, onModulesChange]);

  const deleteSection = useCallback(
    async (sectionId) => {
      const section = sections.find((s) => s.id === sectionId);
      if (section?.moduleData?._id) {
        try {
          if (contentType === "bootcamp") {
            await deleteBootcampModule(contentId, section.moduleData._id);
          } else {
            await deleteCourseModule(contentId, section.moduleData._id);
          }
          toast.success("تم حذف القسم");
        } catch {
          toast.error("فشل حذف القسم");
        }
      }
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      setOpenMenuId(null);
      onModulesChange?.();
    },
    [contentId, sections, onModulesChange]
  );

  // --- Title editing ---

  const toggleEdit = useCallback((sectionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, isEditing: !s.isEditing } : s
      )
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
        prev.map((s) =>
          s.id === sectionId ? { ...s, isEditing: false } : s
        )
      );

      if (section?.moduleData?._id) {
        try {
          if (contentType === "bootcamp") {
            await updateBootcampModule(contentId, section.moduleData._id, { title: section.title });
          } else {
            await updateCourseModule(contentId, section.moduleData._id, { title: section.title });
          }
        } catch {
          console.error("Failed to update section title");
        }
      }
    },
    [contentId, sections]
  );

  // --- Dialog form ---

  const openAddDialog = useCallback((sectionId) => {
    setDialogState({ open: true, sectionId, formData: { title: "" } });
  }, []);

  const closeAddDialog = useCallback(() => {
    setDialogState({ open: false, sectionId: null, formData: { title: "" } });
  }, []);

  const saveDialogForm = useCallback(
    async (form) => {
      const { title, description, moduleType, videoUrl, linkUrl, linkDate, taskUrl, taskImageUrl, taskDescription, quizSubType, questions } = form;
      const { sectionId } = dialogState;
      if (!title?.trim()) {
        toast.error("يرجى إدخال اسم المحتوى");
        return;
      }

      const type = moduleType || "video";
      const isBootcamp = contentType === "bootcamp";

      // Type-specific validation for course only
      if (!isBootcamp) {
        if (type === "video" && !videoUrl?.trim()) {
          toast.error("يرجى إدخال رابط الفيديو");
          return;
        }
      if (type === "link" && !linkUrl?.trim()) {
        toast.error("يرجى إدخال الرابط");
        return;
      }
      if (type === "link" && !linkDate?.trim()) {
        toast.error("يرجى إدخال التاريخ");
        return;
      }
      if (type === "task" && !taskUrl?.trim()) {
        toast.error("يرجى إدخال رابط التكليف");
        return;
      }
      if (type === "quiz" && !quizSubType) {
        toast.error("يرجى اختيار نوع الاختبار");
        return;
      }
    }

    setIsSavingForm(true);
      try {
        const payload = { moduleType: type, title };

        // Add optional description for link/task
        if (description?.trim()) {
          payload.description = description.trim();
        }

        if (type === "video" && videoUrl?.trim()) {
          payload.videoData = { url: videoUrl.trim() };
        }
        if (type === "link") {
          payload.linkData = {
            url: linkUrl.trim(),
            date: linkDate.trim(),
          };
        }
        if (type === "task") {
          payload.taskData = {
            url: taskUrl.trim(),
            ...(taskImageUrl?.trim() && { imageUrl: taskImageUrl.trim() }),
            ...(taskDescription?.trim() && { description: taskDescription.trim() }),
          };
        }
        if (type === "quiz") {
          // API expects: quizData = [{ question, options: string[], answer: string }]
          // Writing questions omit options/answer (open-ended)
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

        let res;
        if (isBootcamp) {
          // Bootcamp specific payload
          // form has timeStart, timeEnd, timezone, liveSession, video, projects
          const bootcampPayload = {
            title,
          };
          if (description?.trim()) bootcampPayload.description = description.trim();
          if (form.timeStart) bootcampPayload.timeStart = form.timeStart;
          if (form.timeEnd) bootcampPayload.timeEnd = form.timeEnd;
          if (form.timezone) bootcampPayload.timezone = form.timezone;
          if (form.liveSessionUrl?.trim()) bootcampPayload.liveSession = { url: form.liveSessionUrl.trim() };
          if (form.videoUrl?.trim()) bootcampPayload.video = { url: form.videoUrl.trim() };
          if (form.projects?.length) {
            bootcampPayload.projects = form.projects.map(p => ({
              title: p.title || "",
              description: p.description || "",
              githubUrl: p.githubUrl || "",
              liveDemoUrl: p.liveDemoUrl || ""
            }));
          }
          res = await createBootcampModule(contentId, bootcampPayload);
        } else {
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
                        type: moduleType || "video",
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
    [contentId, contentType, dialogState, closeAddDialog, onModulesChange]
  );

  // --- Edit dialog ---

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
      if (!moduleId) {
        toast.error("لا يمكن تعديل هذا المحتوى");
        return;
      }

      setEditDialogState((prev) => ({ ...prev, isSaving: true }));
      try {
        const { moduleType: type, title, description, videoUrl, linkUrl, linkDate,
                taskUrl, taskImageUrl, taskDescription, quizSubType, questions } = form;

        const payload = { title };
        if (description?.trim()) payload.description = description.trim();

        if (type === "video" && videoUrl?.trim())  payload.videoData = { url: videoUrl.trim() };
        if (type === "link")  payload.linkData = { url: linkUrl.trim(), date: linkDate.trim() };
        if (type === "task")  payload.taskData = {
          url: taskUrl.trim(),
          ...(taskImageUrl?.trim()    && { imageUrl: taskImageUrl.trim() }),
          ...(taskDescription?.trim() && { description: taskDescription.trim() }),
        };
        if (type === "quiz")  payload.quizData = (questions || []).map((q) => {
          const qItem = { question: q.text };
          if (quizSubType === "mcq" && q.answers?.length) {
            qItem.options = q.answers.map((a) => a.text);
            const correct = q.answers.find((a) => a.isCorrect);
            if (correct) qItem.answer = correct.text;
          }
          return qItem;
        });

        let res;
        if (contentType === "bootcamp") {
          const bootcampPayload = { title };
          if (description?.trim()) bootcampPayload.description = description.trim();
          if (form.timeStart) bootcampPayload.timeStart = form.timeStart;
          if (form.timeEnd) bootcampPayload.timeEnd = form.timeEnd;
          if (form.timezone) bootcampPayload.timezone = form.timezone;
          if (form.liveSessionUrl?.trim()) bootcampPayload.liveSession = { url: form.liveSessionUrl.trim() };
          if (form.videoUrl?.trim()) bootcampPayload.video = { url: form.videoUrl.trim() };
          if (form.projects?.length) {
            bootcampPayload.projects = form.projects.map(p => ({
              title: p.title || "",
              description: p.description || "",
              githubUrl: p.githubUrl || "",
              liveDemoUrl: p.liveDemoUrl || ""
            }));
          }
          res = await updateBootcampModule(contentId, moduleId, bootcampPayload);
          payload = bootcampPayload; // Sync payload for local state update
        } else {
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
                        ? { ...i, title, moduleData: res.data?.data || { ...i.moduleData, ...payload } }
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
    [contentId, contentType, editDialogState, closeEditDialog, onModulesChange]
  );

  // --- Item deletion ---

  const deleteItem = useCallback(
    async (sectionId, itemId, moduleId) => {
      if (moduleId) {
        try {
          if (contentType === "bootcamp") {
            await deleteBootcampModule(contentId, moduleId);
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
    [contentId, contentType, onModulesChange]
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
