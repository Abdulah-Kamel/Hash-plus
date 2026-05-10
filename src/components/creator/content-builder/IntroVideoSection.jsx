"use client";
import React, { useRef, useState } from "react";
import { Trash2, RefreshCw, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadAsset } from "@/actions/uploadActions";

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
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleVideoUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        toast.error("يرجى اختيار ملف فيديو صحيح");
        return;
      }

      setIsUploading(true);

      // Extract duration
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      
      const performUpload = async (duration) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          
          const res = await uploadAsset(formData);
          
          if (res.success && res.data?.url) {
            const videoData = { 
              url: res.data.url, 
              key: res.data.key, 
              uploadId: res.data.uploadId || res.data.id || null,
              size: file.size,
              duration: Math.round(duration)
            };
            
            await onUpdate({ welcomeVideo: videoData });
            toast.success("تم رفع الفيديو التعريفي بنجاح");
          } else {
            toast.error(res.error || "فشل رفع الفيديو");
          }
        } catch (err) {
          toast.error("حدث خطأ أثناء حفظ الفيديو");
        } finally {
          setIsUploading(false);
        }
      };

      videoElement.onloadedmetadata = async () => {
        window.URL.revokeObjectURL(videoElement.src);
        await performUpload(videoElement.duration || 0);
      };
      
      videoElement.onerror = async () => {
        window.URL.revokeObjectURL(videoElement.src);
        await performUpload(0);
      };

      videoElement.src = URL.createObjectURL(file);
    }
  };

  const handleRemove = async () => {
    try {
      await onUpdate({ welcomeVideo: null });
      toast.success("تم حذف الفيديو");
    } catch {
      toast.error("فشل حذف الفيديو");
    }
  };

  const hasVideo = !!welcomeVideo;

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
          <div className="w-20 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Film className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm font-medium text-gray-900 truncate">
              {welcomeVideo?.key || welcomeVideo?.url || "فيديو تعريفي"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
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
      {!hasVideo && (
        <div className="space-y-2">
          {isUploading ? (
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-50">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse">
                <Film className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                جاري رفع الفيديو التعريفي...
              </span>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-primary/50 hover:bg-primary/5 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
            >
              <Film className="w-8 h-8 text-gray-400" />
              <span className="text-primary font-medium text-sm">
                اضغط لاختيار فيديو من جهازك
              </span>
              <p className="text-xs text-gray-400 mt-1">
                يفضل ألا يتجاوز الحجم 100 ميجابايت (يتم الرفع مباشرة)
              </p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IntroVideoSection;
