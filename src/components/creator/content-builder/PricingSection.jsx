"use client";
import React from "react";
import { Input } from "@/components/ui/input";

export default function PricingSection({ form, setForm }) {
  const handleUpdate = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div>
         <h2 className="text-xl font-bold text-gray-900 text-right">السعر</h2>
      </div>

      {/* Set Price Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900 text-right">حدد سعرًا لمعسكرك</h3>
        <p className="text-[14px] font-medium text-gray-400 leading-relaxed text-right">
          يرجى تحديد العملة وفئة السعر لمعسكرك. إذا كنت ترغب في تقديم معسكرك مجانًا، يجب ألا تتجاوز مدة الفيديو ساعتين. كما أن المعسكرات التي تتضمن اختبارات تدريبية لا يمكن أن تكون مجانية.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Currency (First in RTL = Right) */}
          <div className="space-y-2">
             <label className="block text-sm font-semibold text-gray-800 text-right">العملة</label>
             <select
               value={form.currency || "SAR"}
               onChange={(e) => handleUpdate("currency", e.target.value)}
               className="w-full text-right h-12 border border-gray-200 rounded-lg px-3 outline-none focus-visible:ring-primary bg-white"
             >
               <option value="SAR">ريال سعودي</option>
               <option value="USD">دولار أمريكي</option>
             </select>
          </div>

          {/* Base Price (Second in RTL = Left) */}
          <div className="space-y-2">
             <label className="block text-sm font-semibold text-gray-800 text-right">سعر المعسكر الأساسي</label>
             <Input 
               type="number"
               value={form.price || ""} 
               onChange={(e) => handleUpdate("price", e.target.value)} 
               className="text-right h-12" 
               placeholder="100"
               dir="ltr"
             />
          </div>
        </div>


      </div>

      {/* Account Linking */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-base font-bold text-gray-900 text-right">ربط الحساب</h3>
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
          
          <label className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="gateway" value="visa" className="w-5 h-5 text-primary" defaultChecked />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">فيزا</span>
              <div className="flex gap-1" dir="ltr">
                 <div className="w-8 h-5 bg-blue-900 rounded-[2px] text-white text-[10px] flex items-center justify-center font-bold">VISA</div>
                 <div className="w-8 h-5 bg-orange-500 rounded-[2px] text-white text-[10px] flex items-center justify-center font-bold">MC</div>
              </div>
            </div>
          </label>

          <label className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="gateway" value="tabby" className="w-5 h-5 text-primary" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">تابي</span>
              <div className="w-12 h-6 bg-[#3eedbf] rounded-[2px] text-black text-xs flex items-center justify-center font-bold tracking-widest" dir="ltr">tabby</div>
            </div>
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="gateway" value="mada" className="w-5 h-5 text-primary" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">مدى</span>
              <div className="w-10 h-6 bg-white border border-[#2fa16b] rounded-[2px] text-[#2fa16b] text-[10px] flex items-center justify-center font-bold" dir="ltr">mada</div>
            </div>
          </label>

        </div>
      </div>
    </div>
  );
}
