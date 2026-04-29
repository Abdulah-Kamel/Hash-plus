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
import { AlertTriangle } from "lucide-react";

// ─── Edit Section Dialog ──────────────────────────────────────────────────────
export const EditSectionDialog = ({ open, onOpenChange, section, onSave, isSaving = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open && section) {
      setTitle(section.title || "");
      setDescription(section.sectionData?.description || "");
    }
  }, [open, section]);

  const canSubmit = title.trim().length >= 3 && description.trim().length >= 3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSave(section.id, { title: title.trim(), description: description.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold">تعديل القسم</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              عنوان القسم <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-right"
              dir="rtl"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              وصف القسم <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            {isSaving ? <Spinner className="size-4" /> : "حفظ التعديلات"}
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

// ─── Delete Confirmation Dialog ───────────────────────────────────────────────
export const DeleteSectionDialog = ({ open, onOpenChange, section, onConfirm, isDeleting = false }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-red-600 flex items-center gap-2 flex-row-reverse">
            <AlertTriangle className="w-5 h-5" />
            حذف القسم
          </DialogTitle>
        </DialogHeader>

        <div className="py-3 text-right">
          <p className="text-gray-700 text-sm">
            هل أنت متأكد من حذف القسم{" "}
            <span className="font-bold">"{section?.title}"</span>؟
          </p>
          <p className="text-gray-400 text-xs mt-2">
            سيتم حذف القسم وجميع المحتويات الموجودة فيه بشكل نهائي.
          </p>
        </div>

        <DialogFooter className="flex gap-2 flex-row-reverse sm:flex-row-reverse">
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 cursor-pointer"
          >
            {isDeleting ? <Spinner className="size-4" /> : "نعم، احذف"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="flex-1 cursor-pointer"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
