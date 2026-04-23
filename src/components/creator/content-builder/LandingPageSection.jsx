"use client";
import React, { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/components/courses/CourseActions";

export default function LandingPageSection({ form, setForm }) {
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

  const handleUpdate = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleUpdate("thumbnail", file);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-xl font-bold text-gray-900 text-right">صفحة هبوط الدورة التدريبية</h2>
      <p className="text-[15px] font-medium text-gray-400 leading-8 text-right max-w-4xl">
        صفحة هبوط دورتك التدريبية أساسية لنجاحك على هاش بلس. إذا تم تصميمها بشكل صحيح، فستساعدك أيضًا على الظهور في محركات البحث مثل جوجل. عند إكمال هذا القسم، فكّر في إنشاء صفحة هبوط جذّابة لدورتك التدريبية، توضح سبب رغبة أي شخص في التسجيل في دورتك.
      </p>

      <div className="space-y-5 pt-4">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">عنوان الدورة</label>
          <Input 
             value={form.title || ""} 
             onChange={(e) => handleUpdate("title", e.target.value)} 
             className="text-right h-12" 
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">وصف الدورة</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="w-full text-right p-3 border border-gray-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary outline-none transition-all min-h-[120px]"
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">رسالة الترحيب</label>
          <p className="text-[13px] text-gray-500 text-right">رسالة تظهر للطلاب عند اشتراكهم في الدورة.</p>
          <textarea
            value={form.welcomeMessage || ""}
            onChange={(e) => handleUpdate("welcomeMessage", e.target.value)}
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

        {/* Image Upload */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-semibold text-gray-800 text-right">صورة الدورة</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-[#5b73e8]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#5b73e8]/5 transition-colors"
          >
            <Upload className="w-6 h-6 text-[#5b73e8]" />
            <span className="text-[#5b73e8] font-medium text-sm">
              {form.thumbnail ? (form.thumbnail.name || "صورة مرفقة") : "أرفق صورة الدورة هنا"}
            </span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
