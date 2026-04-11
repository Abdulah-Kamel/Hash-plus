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

export default function StepContentCategory({ form }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getAllCategories();
      if (res.success && res.data.data?.length > 0) {
        setCategories(res.data.data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
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
                disabled={loading || error}
              >
                <SelectTrigger className="max-w-xl mx-auto text-right py-6 px-5 text-base border-gray-200 rounded-xl">
                  <SelectValue placeholder={loading ? "جاري التحميل..." : "اختر التصنيف"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
            {error && (
              <p className="text-sm text-red-500 mt-2">
                تعذر تحميل التصنيفات.{" "}
                <button
                  type="button"
                  onClick={fetchCategories}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  إعادة المحاولة
                </button>
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
