"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const AddSectionDialog = ({ open, onOpenChange, onSave, isSaving = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Reset fields when dialog opens
  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
    }
  }, [open]);

  const canSubmit = title.trim().length >= 3 && description.trim().length >= 3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSave({ title: title.trim(), description: description.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold">إضافة قسم جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              عنوان القسم <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: أساسيات التصميم"
              className="text-right"
              dir="rtl"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <p className="text-xs text-gray-400">3 أحرف على الأقل</p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              وصف القسم <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصفاً مختصراً لهذا القسم..."
              className="w-full text-right p-3 border border-gray-200 rounded-lg outline-none focus:border-primary transition-all min-h-[100px] text-sm resize-none"
              dir="rtl"
            />
            <p className="text-xs text-gray-400">3 أحرف على الأقل</p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 flex-row-reverse sm:flex-row-reverse">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSaving}
            className="flex-1 cursor-pointer"
          >
            {isSaving ? <Spinner className="size-4" /> : "إضافة القسم"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
            className="flex-1 cursor-pointer"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
