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
      // modules prop is an array of bootcamp section objects { _id, title, modules: [] }
      if (modules?.length > 0) return modules.map(toBootcampSection);
      return []; // no sections yet — user must create via API
    }
    // Course: flat modules go into a single default section
    return [createDefaultSection("القسم الأول", modules.map(toItem))];
  });

  // Sync when modules prop refreshes from API
  useEffect(() => {
    if (isBootcamp) {
      if (modules?.length > 0) {
        setSections(modules.map(toBootcampSection));
      } else {
        setSections([]); // empty bootcamp — show empty state
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

  // Controls the "Add Section" dialog (bootcamp only)
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);

  // Controls the "Edit Section" dialog (bootcamp only)
  const [editSectionDialog, setEditSectionDialog] = useState({ open: false, section: null, isSaving: false });

  // Controls the "Delete Section" confirmation dialog
  const [deleteSectionDialog, setDeleteSectionDialog] = useState({ open: false, section: null, isDeleting: false });

  // ─── Section CRUD ──────────────────────────────────────────

  // Opens the add-section dialog (bootcamp) OR directly creates a section (course)
  const addSection = useCallback(() => {
    if (isBootcamp) {
      setAddSectionDialogOpen(true);
    } else {
      // course: create immediately with a default title
      const newTitle = `القسم ${sections.length + 1}`;
      setIsCreatingSection(true);
      createCourseModule(contentId, { moduleType: "video", title: newTitle })
        .then((res) => {
          if (res.success) {
            setSections((prev) => [...prev, createDefaultSection(newTitle)]);
            toast.success("تم إضافة القسم بنجاح");
            onModulesChange?.();
          } else {
            toast.error(res.error || "فشل إضافة القسم");
          }
        })
        .catch(() => toast.error("حدث خطأ أثناء إضافة القسم"))
        .finally(() => setIsCreatingSection(false));
    }
  }, [isBootcamp, contentId, sections.length, onModulesChange]);

  // Called by AddSectionDialog onSave — receives { title, description }
  const submitNewSection = useCallback(
    async ({ title, description }) => {
      setIsCreatingSection(true);
      try {
        const res = await createBootcampSection(contentId, { title, description });
        if (res.success) {
          const apiSection = res.data?.data;
          setSections((prev) => [...prev, createDefaultSection(title, [], apiSection?._id)]);
          toast.success("تم إضافة القسم بنجاح");
          setAddSectionDialogOpen(false);
          onModulesChange?.();
        } else {
          toast.error(res.error || "فشل إضافة القسم");
        }
      } catch {
        toast.error("حدث خطأ أثناء إضافة القسم");
      } finally {
        setIsCreatingSection(false);
      }
    },
    [contentId, onModulesChange]
  );

  // Opens delete confirmation dialog instead of immediate delete
  const openDeleteSection = useCallback((sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) setDeleteSectionDialog({ open: true, section, isDeleting: false });
    setOpenMenuId(null);
  }, [sections]);

  const confirmDeleteSection = useCallback(async () => {
    const { section } = deleteSectionDialog;
    if (!section) return;
    setDeleteSectionDialog((prev) => ({ ...prev, isDeleting: true }));
    try {
      if (isBootcamp && section.apiId) {
        await deleteBootcampSection(contentId, section.apiId);
      } else if (!isBootcamp && section.apiId) {
        await deleteCourseModule(contentId, section.apiId);
      }
      setSections((prev) => prev.filter((s) => s.id !== section.id));
      toast.success("تم حذف القسم");
      onModulesChange?.();
    } catch {
      toast.error("فشل حذف القسم");
    } finally {
      setDeleteSectionDialog({ open: false, section: null, isDeleting: false });
    }
  }, [deleteSectionDialog, contentId, isBootcamp, onModulesChange]);

  // ─── Section edit dialog (bootcamp) ───────────────────────────────────────

  const openEditSection = useCallback((sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) setEditSectionDialog({ open: true, section, isSaving: false });
    setOpenMenuId(null);
  }, [sections]);

  const submitEditSection = useCallback(
    async (sectionId, { title, description }) => {
      setEditSectionDialog((prev) => ({ ...prev, isSaving: true }));
      const section = sections.find((s) => s.id === sectionId);
      try {
        if (isBootcamp && section?.apiId) {
          await updateBootcampSection(contentId, section.apiId, { title, description });
        } else if (!isBootcamp && section?.apiId) {
          await updateCourseModule(contentId, section.apiId, { title });
        }
        setSections((prev) =>
          prev.map((s) =>
            s.id === sectionId
              ? { ...s, title, sectionData: { ...s.sectionData, description } }
              : s
          )
        );
        toast.success("تم تعديل القسم");
        setEditSectionDialog({ open: false, section: null, isSaving: false });
        onModulesChange?.();
      } catch {
        toast.error("فشل تعديل القسم");
        setEditSectionDialog((prev) => ({ ...prev, isSaving: false }));
      }
    },
    [contentId, isBootcamp, sections, onModulesChange]
  );

  // ─── Title editing (inline — kept for course) ─────────────────────────────

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
        videoData, videoUrl, linkUrl, linkDate,
        taskUrl, taskImageUrl, taskDescription,
        questions,
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
        if (type === "video" && !videoData?.key) { toast.error("يرجى رفع الفيديو"); return; }
        if (type === "link" && !linkUrl?.trim()) { toast.error("يرجى إدخال الرابط"); return; }
        if (type === "link" && !linkDate?.trim()) { toast.error("يرجى إدخال التاريخ"); return; }
        if (type === "task" && !taskUrl?.trim()) { toast.error("يرجى إدخال رابط التكليف"); return; }

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
          // Backend requires description — default to title if not provided
          payload.description = description?.trim() || title;

          if (type === "video" && videoData?.key) {
            payload.videoData = videoData;
          } else if (type === "video" && videoUrl?.trim()) {
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
              if (q.answers?.length) {
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
          // Backend requires description — default to title if not provided
          payload.description = description?.trim() || title;
          if (type === "video" && videoData?.key) {
            payload.videoData = videoData;
          } else if (type === "video" && videoUrl?.trim()) {
            payload.videoData = { url: videoUrl.trim() };
          }
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
              if (q.answers?.length) {
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
          questions,
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
              if (q.answers?.length) {
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
              if (q.answers?.length) {
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
    addSectionDialogOpen,
    setAddSectionDialogOpen,
    editSectionDialog,
    setEditSectionDialog,
    deleteSectionDialog,
    setDeleteSectionDialog,
    addSection,
    submitNewSection,
    openEditSection,
    submitEditSection,
    openDeleteSection,
    confirmDeleteSection,
    deleteSection: openDeleteSection, // map to old name to keep existing UI from breaking
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
