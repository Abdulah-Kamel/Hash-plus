"use client";
import React, { useRef, useState } from "react";
import { Upload, X, FileText, Film } from "lucide-react";

const CaptionsSection = ({ modules = [], captions = {}, setCaptions }) => {
  const fileInputRefs = useRef({});

  const handleUpload = (moduleId, file) => {
    if (!file) return;
    setCaptions((prev) => ({
      ...prev,
      [moduleId]: { file, status: "uploaded" },
    }));
  };

  const handleRemove = (moduleId) => {
    setCaptions((prev) => {
      const next = { ...prev };
      delete next[moduleId];
      return next;
    });
    if (fileInputRefs.current[moduleId]) {
      fileInputRefs.current[moduleId].value = "";
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 text-right">
        التعليقات التوضيحية
      </h2>

      {/* Description */}
      <div className="text-right space-y-2">
        <p className="text-sm text-gray-500 leading-relaxed">
          يُفضّل المتعلمون من جميع مستويات إجادة اللغة الترجمة المصاحبة بشدة، إذ
          تُساعد على متابعة المحتوى وفهمه وحفظه. كما تُعدّ وجود الترجمة المصاحبة
          أمرًا بالغ الأهمية لضمان سهولة وصول الصم أو ضعاف السمع إلى المحتوى.
        </p>
      </div>

      {/* Module list with captions */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {modules.length > 0 ? (
          modules.map((mod, i) => {
            const moduleId = mod._id || `mod-${i}`;
            const caption = captions[moduleId];

            return (
              <div
                key={moduleId}
                className={`flex items-center justify-between px-5 py-4 ${
                  i < modules.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Module info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Upload / status */}
                  {caption ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 font-medium">
                        {caption.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemove(moduleId)}
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[moduleId]?.click()}
                      className="text-primary text-sm font-medium hover:underline cursor-pointer"
                    >
                      رفع
                    </button>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={(el) => (fileInputRefs.current[moduleId] = el)}
                    type="file"
                    accept=".srt,.vtt,.txt"
                    className="hidden"
                    onChange={(e) =>
                      handleUpload(moduleId, e.target.files?.[0])
                    }
                  />
                </div>

                {/* Caption status */}
                <div className="text-sm text-gray-400 text-center flex-shrink-0 mx-4">
                  {caption
                    ? formatSize(caption.file.size)
                    : "لا يوجد تعليقات توضيحية"}
                </div>

                {/* Module name + icon */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {mod.title || `المحاضرة ${i + 1}`}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    {mod.moduleType === "video" ? (
                      <Film className="w-3 h-3 text-gray-500" />
                    ) : (
                      <FileText className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">لا توجد محاضرات بعد. أضف محتوى من المقرر أولاً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionsSection;
