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
import { X, Upload } from "lucide-react";

const AddCertificateDialog = ({ trigger, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    verificationUrl: "",
    year: "",
    month: "",
    description: "",
    certificateFile: null,
  });

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        certificateFile: file,
      }));
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setFormData({
      title: "",
      issuer: "",
      verificationUrl: "",
      year: "",
      month: "",
      description: "",
      certificateFile: null,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      issuer: "",
      verificationUrl: "",
      year: "",
      month: "",
      description: "",
      certificateFile: null,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[867px] p-0 h-[80vh] overflow-y-auto"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">إضافة شهادة</DialogTitle>
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
            <Label className="text-right font-medium">العنوان</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Google Graphic Design Certificate"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">جهة الشهادة</Label>
            <Input
              value={formData.issuer}
              onChange={(e) => handleInputChange("issuer", e.target.value)}
              placeholder="Google"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">رابط التحقق</Label>
            <Input
              value={formData.verificationUrl}
              onChange={(e) =>
                handleInputChange("verificationUrl", e.target.value)
              }
              placeholder="https://googlecoursera-certificate.com"
              className="w-full h-12 rounded-2xl border-gray-200 text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">تاريخ الشهادة</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.year}
                onValueChange={(value) => handleInputChange("year", value)}
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
                value={formData.month}
                onValueChange={(value) => handleInputChange("month", value)}
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
            <Label className="text-right font-medium">وصف</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="اكتب هنا"
              className="w-full min-h-32 rounded-2xl border-gray-200 text-right resize-none"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">أرفق صورة الشهادة</Label>
            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-blue-50/30">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-medium text-sm">
                    أرفق صورة الشهادة
                  </p>
                  {formData.certificateFile && (
                    <p className="text-gray-600 text-xs mt-1">
                      {formData.certificateFile.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="certificate-upload"
                />
                <label
                  htmlFor="certificate-upload"
                  className="cursor-pointer text-blue-600 text-sm underline"
                >
                  اختر ملف
                </label>
              </div>
            </div>
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

export default AddCertificateDialog;
