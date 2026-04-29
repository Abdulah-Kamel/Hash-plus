"use client";
import React from "react";
import {
  Trash2,
  Video,
  FileQuestion,
  ClipboardList,
  GripVertical,
  Pencil,
  Link2,
  Radio,
} from "lucide-react";

const TYPE_CONFIG = {
  video:       { icon: Video,         label: "فيديو" },
  quiz:        { icon: FileQuestion,  label: "اختبار" },
  task:        { icon: ClipboardList, label: "تكليف" },
  link:        { icon: Link2,         label: "رابط" },
  liveSession: { icon: Radio,         label: "جلسة مباشرة" },
};

const SectionItemsList = ({ items = [], onDelete, onEdit }) => {
  if (items.length === 0) return null;

  return (
    <div className="p-4 space-y-3 bg-gray-50/30">
      {items.map((item) => {
        const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.video;
        const Icon   = config.icon;

        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl bg-white px-4 py-3 flex items-center justify-between shadow-sm"
          >
            {/* Left: delete */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <button
                type="button"
                title="حذف المحتوى"
                onClick={() => onDelete(item.id, item.moduleData?._id)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Right: drag + title + type badge + edit */}
            <div className="flex items-center gap-3 order-1 sm:order-2 flex-1 justify-end min-w-0">
              {/* Edit pencil */}
              <button
                type="button"
                title="تعديل المحتوى"
                onClick={() => onEdit?.(item)}
                className="text-gray-400 hover:text-primary transition-colors p-1 cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>

              {/* Title */}
              <span className="font-semibold text-gray-800 text-[15px] text-right truncate">
                {item.title}
              </span>

              {/* Type badge */}
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-2.5 py-1 flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">{config.label}</span>
              </div>

              {/* Drag handle */}
              <div className="text-gray-300 cursor-grab px-1 flex-shrink-0">
                <GripVertical className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionItemsList;
