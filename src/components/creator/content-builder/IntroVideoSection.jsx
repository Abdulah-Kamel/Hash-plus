"use client";
import React, { useRef, useState } from "react";
import { Upload, Trash2, RefreshCw, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const tips = [
  {
    title: "يمكن أن تكون المعدات سهلة.",
    text: "لست بحاجة لشراء معدات باهظة الثمن. فمعظم كاميرات الهواتف الذكية قادرة على تصوير الفيديو بدقة عالية. ويمكنك تسجيل الصوت على هاتف آخر أو ميكروفون خارجي.",
  },
  {
    title: "يجب على الطلاب أن يسمعوك.",
    text: "الميكروفون الجيد هو أهم قطعة من المعدات التي ستختارها. تتوفر خيارات متعددة بأسعار معقولة. تأكد من توصيله بشكل صحيح وأن يكون على بُعد 15-30 سم (6-12 بوصة) منك.",
  },
  {
    title: "اصنع استوديو.",
    text: "نظّف خلفيتك ورتّب الدعائم. يمكن تحويل أي مساحة صغيرة تقريباً بخلفية مصنوعة من ورق ملون أو ملاءة سرير مكوية.",
  },
  {
    title: "أضئ المشهد ووجهك.",
    text: "أطفئ الأضواء العلوية. جرّب إضاءة ثلاثية النقاط بوضع مصباحين أمامك ومصباح واحد خلفك موجهاً نحو الخلفية.",
  },
  {
    title: "تقليل الضوضاء والصدى.",
    text: "أطفئ المراوح وفتحات التهوية. وسجّل في وقت هادئ. ضع رغوة صوتية أو بطانيات على الجدران. وأدخل سجاداً أو أثاثاً لخفض صدى الصوت.",
  },
  {
    title: "كن مبدعاً.",
    text: "لن يرى الطلاب ما وراء الكواليس. لن يعرف أحد أن كنت محاطاً بالوسائد لعزل الصوت... إلا إذا أخبرت المدربين الآخرين في المنطقة!",
  },
];

const IntroVideoSection = ({ contentId, welcomeVideo, onUpdate }) => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast.error("يرجى اختيار ملف فيديو صالح");
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast.error("حجم الملف يتجاوز 500 ميجابايت");
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Update the content with welcomeVideo field
    setIsUploading(true);
    try {
      await onUpdate({ welcomeVideo: file.name });
      toast.success("تم رفع الفيديو بنجاح");
    } catch {
      toast.error("فشل رفع الفيديو");
    }
    setIsUploading(false);
  };

  const handleRemove = async () => {
    setUploadedFile(null);
    try {
      await onUpdate({ welcomeVideo: null });
      toast.success("تم حذف الفيديو");
    } catch {
      toast.error("فشل حذف الفيديو");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const hasVideo = uploadedFile || welcomeVideo;

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 text-right">
        الفيديو التعريفي
      </h2>

      {/* Description & Tips */}
      <div className="text-right space-y-1">
        <p className="text-sm text-gray-500 leading-relaxed">
          من المهم الآن إعداد الصوت والفيديو بشكل صحيح، لأن إصلاح الفيديوهات
          بعد التسجيل يصبح أصعب بكثير. هناك العديد من الطرق الإبداعية لاستخدام ما
          لديك لإنشاء فيديو احترافي.
        </p>
      </div>

      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="text-right">
            <h4 className="font-bold text-gray-900 text-sm">{tip.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>

      {/* Uploaded Video Preview */}
      {hasVideo && (
        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4">
          {/* Video Thumbnail Placeholder */}
          <div className="w-20 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Film className="w-8 h-8 text-primary" />
          </div>

          {/* File Info */}
          <div className="flex-1 text-right">
            <p className="text-sm font-medium text-gray-900">
              {uploadedFile?.name || welcomeVideo || "فيديو تعريفي.mp4"}
            </p>
            {uploadedFile?.size && (
              <p className="text-xs text-gray-400 mt-0.5">
                {formatFileSize(uploadedFile.size)}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary hover:text-primary/80 text-xs cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 ml-1" />
              تبديل
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-600 text-xs cursor-pointer"
            >
              <Trash2 className="w-3 h-3 ml-1" />
              حذف
            </Button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-primary font-medium">أرفق الفيديو هنا</p>
        <p className="text-xs text-gray-400 mt-1">
          MP4, MOV أو AVI (حد أقصى 500 ميجابايت)
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default IntroVideoSection;
