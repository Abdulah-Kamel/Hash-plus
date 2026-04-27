"use client";
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurriculum } from "./curriculum/useCurriculum";
import SectionHeader from "./curriculum/SectionHeader";
import SectionItemsList from "./curriculum/SectionItemsList";
import AddContentDialog from "./curriculum/AddContentDialog";
import EditModuleDialog from "./curriculum/EditModuleDialog";

const CurriculumSection = ({ contentId, contentType = "course", modules = [], onModulesChange }) => {
  const {
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
  } = useCurriculum(contentId, contentType, modules, onModulesChange);

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 text-right">المقرر</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 text-right leading-relaxed">
        ابدأ بإعداد معسكرك بإنشاء أقسام ومحاضرات وأنشطة تدريبية (اختبارات قصيرة،
        تمارين برمجة، وواجبات). استخدم مخطط المعسكر لتنظيم محتوك وتصنيف أقسامك
        ومحاضراتك بوضوح. إذا كنت تنوي تقديم معسكرك مجاناً فيجب ألا تتجاوز مدة
        الفيديو ساعتين.
      </p>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <SectionHeader
              section={section}
              isMenuOpen={openMenuId === section.id}
              onToggleMenu={() =>
                setOpenMenuId(openMenuId === section.id ? null : section.id)
              }
              onToggleEdit={() => toggleEdit(section.id)}
              onUpdateTitle={updateTitle}
              onSaveTitle={saveTitle}
              onDelete={() => deleteSection(section.id)}
            />

            <SectionItemsList
              items={section.items}
              onDelete={(itemId, moduleId) =>
                deleteItem(section.id, itemId, moduleId)
              }
              onEdit={(item) => openEditDialog(section.id, item)}
            />

            {/* Add content button per section */}
            <div
              className="flex items-center justify-center px-4 py-5 border-t border-gray-100 bg-white"
              dir="rtl"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAddDialog(section.id)}
                className="text-sm px-5 h-9 gap-2 rounded-full border-primary/30 text-primary hover:bg-primary/5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                أضف محتوى
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Button */}
      <button
        type="button"
        onClick={addSection}
        disabled={isCreatingSection}
        className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium justify-end w-full cursor-pointer disabled:opacity-50"
      >
        <PlusCircle className="w-4 h-4" />
        <span>{isCreatingSection ? "جاري الإضافة..." : "أضف قسم آخر"}</span>
      </button>

      {/* Add Content Dialog */}
      <AddContentDialog
        contentType={contentType}
        open={dialogState.open}
        onOpenChange={(isOpen) => !isOpen && closeAddDialog()}
        onSave={saveDialogForm}
        isSaving={isSavingForm}
      />

      {/* Edit Module Dialog */}
      <EditModuleDialog
        contentType={contentType}
        open={editDialogState.open}
        onOpenChange={(isOpen) => !isOpen && closeEditDialog()}
        item={editDialogState.item}
        onSave={saveEditForm}
        isSaving={editDialogState.isSaving}
      />
    </div>
  );
};

export default CurriculumSection;
