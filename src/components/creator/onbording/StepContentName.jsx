"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
    </div>
  );
}
