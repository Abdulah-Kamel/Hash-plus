"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ContentBuilderTopBar = ({ title = "", onSave, isSaving = false }) => {
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
        <Button
          variant="outline"
          className="px-6 rounded-full text-primary border-primary hover:bg-primary/5 cursor-pointer"
        >
          عرض المحتوى
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="px-6 rounded-full bg-primary hover:bg-primary/90 text-white cursor-pointer"
        >
          {isSaving ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </header>
  );
};

export default ContentBuilderTopBar;
