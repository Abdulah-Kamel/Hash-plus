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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ChevronDown } from "lucide-react";

const EditLanguagesDialog = ({ trigger, onSave }) => {
  const [languages, setLanguages] = useState([
    { id: 1, language: "العربية", proficiency: "اللغة الأم" },
    { id: 2, language: "الإنجليزية", proficiency: "محترف" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const languageOptions = [
    "العربية",
    "الإنجليزية",
    "الفرنسية",
    "الألمانية",
    "الإسبانية",
    "الإيطالية",
    "الروسية",
    "الصينية",
    "اليابانية",
  ];

  const proficiencyOptions = ["اللغة الأم", "محترف", "متوسط", "مبتدئ"];

  const handleLanguageChange = (id, field, value) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(languages);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[867px] p-0" dir="rtl" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">
            تعديل اللغات
          </DialogTitle>
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
          {languages.map((lang, index) => (
            <div key={lang.id} className="grid grid-cols-2 gap-4">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label className="text-right font-medium">اللغة</Label>
                <Select
                  value={lang.language}
                  onValueChange={(value) =>
                    handleLanguageChange(lang.id, "language", value)
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl border-gray-200 text-right" dir="rtl">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {languageOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="text-right"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right font-medium">درجة الإتقان</Label>
                <Select
                  value={lang.proficiency}
                  onValueChange={(value) =>
                    handleLanguageChange(lang.id, "proficiency", value)
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl border-gray-200 text-right" dir="rtl">
                    <SelectValue placeholder="اختر درجة الإتقان" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {proficiencyOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="text-right"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
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

export default EditLanguagesDialog;
