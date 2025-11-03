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
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const AddExperienceDialog = ({ trigger, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    city: "",
    jobTitle: "",
    workType: "",
    employmentType: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    currentlyWorking: false,
    technologies: [],
    description: "",
  });

  const countries = [
    "مصر",
    "السعودية",
    "الإمارات",
    "الكويت",
    "قطر",
    "البحرين",
    "عمان",
    "الأردن",
    "لبنان",
    "سوريا",
    "العراق",
    "المغرب",
    "الجزائر",
    "تونس",
  ];

  const cities = [
    "القاهرة",
    "الرياض",
    "جدة",
    "دبي",
    "أبوظبي",
    "الكويت",
    "الدوحة",
    "المنامة",
    "مسقط",
    "عمان",
    "بيروت",
    "دمشق",
    "بغداد",
    "الرباط",
    "الجزائر",
    "تونس",
  ];

  const workTypes = ["كامل", "جزئي", "تدريب", "مشروع"];

  const employmentTypes = ["في الموقع", "عن بعد", "مختلط"];

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

  const suggestedTechnologies = [
    "Adobe Photoshop",
    "Adobe Photoshop",
    "Adobe XD",
    "Adobe XD",
    "Lovart",
    "Figma",
    "Miro",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setFormData({
      company: "",
      country: "",
      city: "",
      jobTitle: "",
      workType: "",
      employmentType: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      currentlyWorking: false,
      technologies: [],
      description: "",
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      company: "",
      country: "",
      city: "",
      jobTitle: "",
      workType: "",
      employmentType: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      currentlyWorking: false,
      technologies: [],
      description: "",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[867px] p-0 max-h-[90vh] overflow-y-auto"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">إضافة خبرات</DialogTitle>
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
            <Label className="text-right font-medium">الشركة</Label>
            <Input
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Optomatica"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-right font-medium">الدولة</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="مصر" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {countries.map((country) => (
                    <SelectItem
                      key={country}
                      value={country}
                      className="text-right"
                    >
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-right font-medium">المدينة</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleInputChange("city", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="القاهرة" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-right">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">المسمى الوظيفي</Label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="مصمم جرافيك"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-right font-medium">نوع العمل</Label>
              <Select
                value={formData.workType}
                onValueChange={(value) => handleInputChange("workType", value)}
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="كامل" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {workTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-right">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-right font-medium">طريقة العمل</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) =>
                  handleInputChange("employmentType", value)
                }
              >
                <SelectTrigger
                  className="w-full h-12 rounded-2xl border-gray-200 text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="في الموقع" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-right">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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

          <div className="space-y-2">
            <Label className="text-right font-medium">تاريخ الانتهاء</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.endYear}
                onValueChange={(value) => handleInputChange("endYear", value)}
                disabled={formData.currentlyWorking}
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
                disabled={formData.currentlyWorking}
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

          <div className="flex items-center space-x-2 justify-end">
            <Label
              htmlFor="currently-working"
              className="text-right font-medium"
            >
              ما زلت أعمل هنا
            </Label>
            <Checkbox
              id="currently-working"
              checked={formData.currentlyWorking}
              onCheckedChange={(checked) =>
                handleInputChange("currentlyWorking", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">التقنيات المستخدمة</Label>
            <Textarea
              placeholder="اكتب هنا"
              className="w-full min-h-20 rounded-2xl border-gray-200 text-right resize-none"
              dir="rtl"
            />
            <div className="flex flex-wrap gap-2 mt-2" dir="rtl">
              {suggestedTechnologies.map((tech, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                    formData.technologies.includes(tech)
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleTechnologyToggle(tech)}
                >
                  {tech}
                  {formData.technologies.includes(tech) && (
                    <X className="inline-block w-3 h-3 ml-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">وصف</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="اكتب هنا"
              className="w-full min-h-32 rounded-2xl border-gray-200 text-right resize-none"
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

export default AddExperienceDialog;
