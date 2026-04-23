"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddModuleForm = ({
  formData,
  onFormChange,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white my-4 mx-6">
      <div className="flex flex-col gap-5">
        {/* Content Name */}
        <div className="flex flex-col gap-2">
          <label className="text-right text-sm font-semibold text-gray-800">
            اسم المحتوى
          </label>
          <Input
            value={formData.title}
            onChange={(e) =>
              onFormChange({ ...formData, title: e.target.value })
            }
            className="text-right text-sm h-11 border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary"
            dir="rtl"
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2" dir="rtl">
          <Button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="bg-[#5b73e8] hover:bg-[#5b73e8]/90 text-white px-8 rounded-full h-10 text-sm font-medium cursor-pointer"
          >
            {isSaving ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border border-gray-900 text-gray-900 hover:bg-gray-50 px-8 rounded-full h-10 text-sm font-medium cursor-pointer"
          >
            الغاء
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModuleForm;
