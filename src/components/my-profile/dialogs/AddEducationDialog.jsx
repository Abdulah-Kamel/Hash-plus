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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const AddEducationDialog = ({ trigger, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    university: "",
    degree: "",
    fieldOfStudy: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    description: "",
  });

  const degreeOptions = [
    "بكالوريوس",
    "ماجستير",
    "دكتوراه",
    "دبلوم",
    "شهادة مهنية",
  ];

  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const years = Array.from({ length: 50 }, (_, i) => 2024 - i);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setFormData({
      university: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      description: "",
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      university: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      description: "",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[867px] h-[80vh] overflow-y-auto p-0" dir="rtl" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">إضافة تعليم</DialogTitle>
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
          {/* University */}
          <div className="space-y-2">
            <Label className="text-right font-medium">الجامعة</Label>
            <Input
              value={formData.university}
              onChange={(e) => handleInputChange("university", e.target.value)}
              placeholder="جامعة الملك فهد"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          {/* Degree */}
          <div className="space-y-2">
            <Label className="text-right font-medium">الدرجة التعليمية</Label>
            <Select
              value={formData.degree}
              onValueChange={(value) => handleInputChange("degree", value)}
            >
              <SelectTrigger
                className="w-full h-12 rounded-2xl border-gray-200 text-right"
                dir="rtl"
              >
                <SelectValue placeholder="بكالوريوس" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {degreeOptions.map((option) => (
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

          {/* Field of Study */}
          <div className="space-y-2">
            <Label className="text-right font-medium">مجال الدراسة</Label>
            <Input
              value={formData.fieldOfStudy}
              onChange={(e) =>
                handleInputChange("fieldOfStudy", e.target.value)
              }
              placeholder="تصميم جرافيك"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label className="text-right font-medium">تاريخ الابتداء</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.startYear}
                onValueChange={(value) => handleInputChange("startYear", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="سنة" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className="text-right"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.startMonth}
                onValueChange={(value) =>
                  handleInputChange("startMonth", value)
                }
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="شهر" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {months.map((month) => (
                    <SelectItem
                      key={month}
                      value={month}
                      className="text-right"
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label className="text-right font-medium">تاريخ الانتهاء</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.endYear}
                onValueChange={(value) => handleInputChange("endYear", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="سنة" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className="text-right"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.endMonth}
                onValueChange={(value) => handleInputChange("endMonth", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="شهر" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {months.map((month) => (
                    <SelectItem
                      key={month}
                      value={month}
                      className="text-right"
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-right font-medium">
              ما زلت أدرس هنا
              <br />
              وصف
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="اكتب هنا"
              className="w-full min-h-32 rounded-2xl border-gray-200 text-right resize-none"
              dir="rtl"
            />
          </div>
        </div>

        {/* Footer */}
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

export default AddEducationDialog;
