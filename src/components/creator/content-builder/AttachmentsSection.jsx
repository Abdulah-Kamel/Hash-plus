"use client";
import React, { useRef, useState } from "react";
import { Upload, Trash2, GripVertical, Loader2 } from "lucide-react";
import { uploadAsset } from "@/actions/uploadActions";
import { toast } from "sonner";

const AttachmentsSection = ({ attachments = [], setAttachments }) => {
  const fileInputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const filesArray = Array.from(e.target.files);
      
      for (const f of filesArray) {
        try {
          const formData = new FormData();
          formData.append("file", f);
          
          const res = await uploadAsset(formData);
          if (res.success && res.data?.url) {
            const newFile = {
              id: crypto.randomUUID(),
              name: f.name.replace(/\.[^/.]+$/, ""), // Remove extension for display
              extension: f.name.includes(".") ? f.name.split(".").pop().toUpperCase() : "FILE",
              url: res.data.url,
            };
            setAttachments((prev) => [...prev, newFile]);
            toast.success(`تم رفع ${f.name} بنجاح`);
          } else {
            toast.error(res.error || `فشل رفع ${f.name}`);
          }
        } catch (err) {
          toast.error(`حدث خطأ أثناء رفع ${f.name}`);
        }
      }
      setIsUploading(false);
      // Reset input so the same files can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (id) => {
    setAttachments((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-right">الملحقات</h2>

      <div className="text-right">
        <p
          className="text-[15px] font-medium text-gray-400 leading-8 max-w-3xl ml-auto"
          dir="rtl"
        >
          يُفَضِّل المتعلمون من جميع مستويات إجادة اللغة الترجمة المصاحبة بشدة،
          إذ تُساعد على متابعة المحتوى وفهمه وحفظه. كما يُعَدّ وجود الترجمة
          المصاحبة أمرًا بالغ الأهمية لضمان سهولة وصول الصم أو ضعاف السمع إلى
          المحتوى. تعرّف على المزيد.
        </p>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-sm font-bold text-gray-700 text-right">
          اضافة ملحقات للدورة
        </label>

        {/* Dropzone */}
        {isUploading ? (
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-50">
            <Loader2 className="w-8 h-8 text-[#5b73e8] animate-spin" />
            <span className="text-sm font-medium text-gray-600">
              جاري رفع الملحقات...
            </span>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-[#5b73e8]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#5b73e8]/5 transition-colors"
          >
            <Upload className="w-6 h-6 text-[#5b73e8]" />
            <span className="text-[#5b73e8] font-medium text-sm">
              أرفق الملحقات هنا (PDF, Word, الخ)
            </span>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {/* File List */}
      {attachments.length > 0 && (
        <div className="space-y-3 pt-6">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="border border-gray-100 rounded-xl p-3 flex items-center justify-between bg-white shadow-sm transition-all hover:border-gray-200"
            >
              <button
                type="button"
                onClick={() => handleRemove(file.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
                <span className="text-[15px] font-medium text-gray-700 text-right truncate">
                  {file.name}
                </span>

                <div className="w-[34px] h-[34px] flex items-center justify-center bg-[#15d886] rounded-lg flex-shrink-0">
                  <span className="text-white text-[10px] font-bold tracking-wider">
                    {file.extension || (file.url?.includes(".") ? file.url.split(".").pop().toUpperCase().substring(0, 4) : "FILE")}
                  </span>
                </div>

                <div className="text-gray-400 cursor-grab flex-shrink-0">
                  <GripVertical className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentsSection;
