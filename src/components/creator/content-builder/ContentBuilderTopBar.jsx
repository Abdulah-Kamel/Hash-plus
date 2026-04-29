"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ContentBuilderTopBar = ({ title = "", onSave, isSaving = false, canSave = true }) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
      {/* Right side - back button and title */}
      <div className="flex items-center gap-3">
        <Link
          href="/creator/home"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة إلى الرئيسية</span>
        </Link>
        <div className="w-px h-6 bg-gray-300" />
        <span className="text-sm font-medium text-gray-900 max-w-md truncate">
          {title || "محتوى بدون عنوان"}
        </span>
      </div>

      {/* Left side - action buttons */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-0.5">
          <Button
            onClick={onSave}
            disabled={isSaving || !canSave}
            title={!canSave ? "أكمل جميع الأقسام المطلوبة أولاً" : ""}
            className={`px-6 rounded-full text-white cursor-pointer transition-all ${
              canSave
                ? "bg-primary hover:bg-primary/90"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isSaving ? "جاري الحفظ..." : "حفظ"}
          </Button>
          {!canSave && (
            <span className="text-xs text-amber-500">أكمل الأقسام المطلوبة ⚠</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ContentBuilderTopBar;
