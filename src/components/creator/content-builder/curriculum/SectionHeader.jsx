"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Check,
  GripVertical
} from "lucide-react";

const SectionHeader = ({
  section,
  isMenuOpen,
  onToggleMenu,
  onToggleEdit,
  onUpdateTitle,
  onSaveTitle,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Menu */}
      <div className="relative">
        <button
          type="button"
          onClick={onToggleMenu}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
            <button
              type="button"
              onClick={onToggleEdit}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer text-right justify-end"
            >
              تعديل الاسم
              <Pencil className="w-3.5 h-3.5 ml-2" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer text-right justify-end"
            >
              حذف القسم
              <Trash2 className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {section.isEditing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSaveTitle(section.id)}
              className="p-1 text-green-500 hover:text-green-600 cursor-pointer"
            >
              <Check className="w-5 h-5" />
            </button>
            <Input
              value={section.title}
              onChange={(e) => onUpdateTitle(section.id, e.target.value)}
              className="text-right text-base font-semibold max-w-[200px] h-9"
              dir="rtl"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveTitle(section.id);
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleEdit}
              className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <span className="text-base font-semibold text-gray-900">
              {section.title}
            </span>
          </div>
        )}
        <div className="text-gray-300">
          <GripVertical className="w-5 h-5 cursor-grab" />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
