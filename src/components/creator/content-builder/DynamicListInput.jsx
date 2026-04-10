"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, PlusCircle } from "lucide-react";

const DynamicListInput = ({
  items = [],
  onAdd,
  onRemove,
  onChange,
  placeholder = "أدخل النص هنا",
  addLabel = "أضف آخر",
  minItems = 1,
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 group">
          {/* Delete Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            disabled={items.length <= minItems}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {/* Input */}
          <Input
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-right py-5 px-4 text-sm border-gray-200 rounded-lg focus:border-primary focus:ring-primary/20"
            dir="rtl"
          />

          {/* Drag Handle */}
          <div className="text-gray-300 hover:text-gray-500 cursor-grab flex-shrink-0">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium justify-end w-full pt-2 cursor-pointer"
      >
        <PlusCircle className="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
};

export default DynamicListInput;
