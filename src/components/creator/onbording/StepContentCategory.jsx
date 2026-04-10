"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/components/courses/CourseActions";

const fallbackCategories = [
  { _id: "design", name: "تصميم" },
  { _id: "programming", name: "برمجة" },
  { _id: "marketing", name: "تسويق" },
  { _id: "business", name: "إدارة أعمال" },
  { _id: "data", name: "علم البيانات" },
  { _id: "ai", name: "ذكاء اصطناعي" },
];

export default function StepContentCategory({ form }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success && res.data.data?.length > 0) {
        setCategories(res.data.data);
      } else {
        setCategories(fallbackCategories);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          ما هو نوع المحتوى الذي تقدمه
        </h2>
        <p className="text-sm text-gray-400 mt-3">
          لا تقلق، يمكنك تغييره لاحقاً
        </p>
      </div>

      <FormField
        control={form.control}
        name="contentCategory"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                dir="rtl"
              >
                <SelectTrigger className="max-w-xl mx-auto text-right py-6 px-5 text-base border-gray-200 rounded-xl">
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <SelectItem value="loading" disabled>
                      جاري التحميل...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      لا توجد تصنيفات
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
