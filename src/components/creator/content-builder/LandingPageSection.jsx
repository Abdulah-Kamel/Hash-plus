"use client";
import React, { useRef, useState, useEffect } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/components/courses/CourseActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadAsset } from "@/actions/uploadActions";
import { toast } from "sonner";
import Image from "next/image";

export default function LandingPageSection({ form, setForm, contentId, onUpdate }) {
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    async function fetchCats() {
      try {
        setLoadingCats(true);
        const res = await getAllCategories();
        if (res.success && res.data?.data) {
           setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoadingCats(false);
      }
    }
    fetchCats();
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdate = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate image
      if (!file.type.startsWith('image/')) {
        toast.error("يرجى اختيار ملف صورة صحيح");
        return;
      }
      
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await uploadAsset(formData);
        
        if (res.success && res.data?.url) {
          const thumbData = { url: res.data.url, key: res.data.key };
          handleUpdate("thumbnail", thumbData);
          if (onUpdate && contentId) {
            try {
              await onUpdate({ thumbnail: thumbData });
              toast.success("تم رفع الصورة وحفظها بنجاح");
              setIsDialogOpen(false);
            } catch (err) {
              toast.error("فشل حفظ الصورة في المحتوى");
            }
          } else {
            setIsDialogOpen(false);
          }
        } else {
          toast.error(res.error || "فشل رفع الصورة");
        }
      } catch (err) {
        toast.error("حدث خطأ أثناء الرفع");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-xl font-bold text-gray-900 text-right">صفحة هبوط المعسكر</h2>
      <p className="text-[15px] font-medium text-gray-400 leading-8 text-right max-w-4xl">
        صفحة هبوط معسكرك أساسية لنجاحك على هاش بلس. إذا تم تصميمها بشكل صحيح، فستساعدك أيضًا على الظهور في محركات البحث مثل جوجل. عند إكمال هذا القسم، فكّر في إنشاء صفحة هبوط جذّابة لمعسكرك، توضح سبب رغبة أي شخص في التسجيل في معسكرك.
      </p>

      <div className="space-y-5 pt-4">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">عنوان المعسكر</label>
          <Input 
             value={form.title || ""} 
             onChange={(e) => handleUpdate("title", e.target.value)} 
             className="text-right h-12" 
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">وصف المعسكر</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="w-full text-right p-3 border border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary outline-none transition-all min-h-[120px]"
          />
        </div>
        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">نوع المحتوى</label>
          <select
            value={form.category || ""}
            onChange={(e) => handleUpdate("category", e.target.value)}
            className="w-full text-right h-12 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white disabled:bg-gray-50"
            dir="rtl"
            disabled={loadingCats}
          >
            <option value="" disabled>{loadingCats ? "جاري التحميل..." : "اختر التصنيف"}</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Level and Language Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <label className="block text-sm font-semibold text-gray-800 text-right">اللغة</label>
             <select
               value={form.language || "العربية"}
               onChange={(e) => handleUpdate("language", e.target.value)}
               className="w-full text-right h-12 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white"
               dir="rtl"
             >
               <option value="العربية">العربية</option>
               <option value="الإنجليزية">الإنجليزية</option>
             </select>
          </div>
          <div className="space-y-2">
             <label className="block text-sm font-semibold text-gray-800 text-right">المستوى</label>
             <select
               value={form.level || "المبتدئ"}
               onChange={(e) => handleUpdate("level", e.target.value)}
               className="w-full text-right h-12 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white"
               dir="rtl"
             >
               <option value="المبتدئ">المبتدئ</option>
               <option value="متوسط">متوسط</option>
               <option value="متقدم">متقدم</option>
             </select>
          </div>
        </div>

        {/* Image Upload Dialog */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">صورة المعسكر</label>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="border border-dashed border-[#5b73e8]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#5b73e8]/5 transition-colors group">
                {form.thumbnail && (form.thumbnail.url || typeof form.thumbnail === 'string') ? (
                  <div className="relative w-full max-w-[200px] h-[120px] rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={form.thumbnail.url || form.thumbnail} 
                      alt="Thumbnail preview" 
                      className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <Upload className="w-6 h-6 text-white mb-1" />
                      <span className="text-white font-medium text-xs">تغيير الصورة</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-[#5b73e8]" />
                    <span className="text-[#5b73e8] font-medium text-sm">أرفق صورة المعسكر هنا</span>
                  </>
                )}
              </div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-right">صورة المعسكر</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {form.thumbnail && (form.thumbnail.url || typeof form.thumbnail === 'string') && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 text-right">الصورة الحالية:</p>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={form.thumbnail.url || form.thumbnail} 
                        alt="Current thumbnail" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 text-right">
                    {form.thumbnail ? "اختر صورة جديدة لتغيير الحالية:" : "اختر صورة لرفعها:"}
                  </p>
                  
                  {isUploading ? (
                    <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-4 bg-gray-50">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <span className="text-sm font-medium text-gray-600">
                        جاري الرفع...
                      </span>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-gray-600 font-medium text-sm">
                        اضغط لاختيار صورة من جهازك
                      </span>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                  
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </div>
  );
}
