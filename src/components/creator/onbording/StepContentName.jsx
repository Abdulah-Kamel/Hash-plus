"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StepContentName({ form }) {
  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          ما هو اسم المحتوى الذي تقدمه
        </h2>
        <p className="text-sm text-gray-400 mt-3">
          لا تقلق، يمكنك كتابة اسم ثم تغييره لاحقاً
        </p>
      </div>

      {/* Content Name */}
      <FormField
        control={form.control}
        name="contentName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="دورة UI/UX Design من الصفر إلى الأحتراف"
                className="max-w-xl mx-auto text-right py-6 px-5 text-base border-gray-200 rounded-xl focus:border-primary focus:ring-primary/20"
                dir="rtl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Content Description */}
      <div className="text-right max-w-xl mx-auto">
        <p className="text-sm text-gray-500 mb-2 font-medium">وصف المحتوى</p>
      </div>
      <FormField
        control={form.control}
        name="contentDescription"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="اكتب وصفاً مختصراً للمحتوى الذي تقدمه..."
                className="max-w-xl mx-auto text-right py-4 px-5 text-base border-gray-200 rounded-xl focus:border-primary focus:ring-primary/20 min-h-[120px] resize-none"
                dir="rtl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
