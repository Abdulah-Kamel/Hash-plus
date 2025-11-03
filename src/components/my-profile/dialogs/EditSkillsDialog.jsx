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
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2 } from "lucide-react";

const EditSkillsDialog = ({ trigger, onSave, initialSkills = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !skills.some((skill) => skill.name === newSkill.trim())
    ) {
      const skillWithId = {
        id: Date.now(),
        name: newSkill.trim(),
      };
      setSkills([...skills, skillWithId]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(skills);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSkills(initialSkills);
    setNewSkill("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[867px] h-[80vh] overflow-y-auto p-0"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-normal">
            تعديل المهارات
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
          <div className="space-y-2">
            <Label className="text-right font-medium">إضافة مهارة جديدة</Label>
            <div className="flex gap-2">
              <Button
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
                className="px-4 py-2 h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="size-4" />
              </Button>
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب اسم المهارة"
                className="flex-1 h-12 rounded-2xl border-gray-200 text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">المهارات الحالية</Label>
            <div className="min-h-32 p-4 border border-gray-200 rounded-2xl">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2" dir="rtl">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium group hover:bg-gray-200 transition-colors"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="p-0 h-4 w-4 rounded-full hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
                  لا توجد مهارات مضافة بعد
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-right font-medium">مهارات مقترحة</Label>
            <div className="flex flex-wrap gap-2" dir="rtl">
              {[
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Adobe XD",
                "Figma",
                "Sketch",
                "InVision",
                "Canva",
                "CorelDRAW",
                "After Effects",
                "Premiere Pro",
              ]
                .filter(
                  (suggestedSkill) =>
                    !skills.some((skill) => skill.name === suggestedSkill)
                )
                .map((suggestedSkill) => (
                  <Button
                    key={suggestedSkill}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const skillWithId = {
                        id: Date.now() + Math.random(),
                        name: suggestedSkill,
                      };
                      setSkills([...skills, skillWithId]);
                    }}
                    className="px-3 py-1 h-8 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full text-sm font-medium"
                  >
                    <Plus className="size-3 mr-1" />
                    {suggestedSkill}
                  </Button>
                ))}
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

export default EditSkillsDialog;
