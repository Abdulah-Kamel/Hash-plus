"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

const EditDescriptionDialog = ({
  trigger,
  onSave,
  initialDescription = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    if (onSave) {
      onSave(description);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDescription(initialDescription);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[867px] p-0" dir="rtl" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">تعديل الوصف</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-right font-medium">الوصف</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب هنا"
              className="w-full min-h-64 rounded-2xl border-gray-200 text-right resize-none"
              dir="rtl"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 p-6 pt-0">
          <Button
            onClick={handleSave}
            className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-medium"
          >
            حفظ
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-8 py-3 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full font-medium"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDescriptionDialog;
