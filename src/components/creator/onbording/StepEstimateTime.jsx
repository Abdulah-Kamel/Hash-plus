"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const timeOptions = [
  { value: "busy", label: "مشغول جداً (0-2 ساعة)" },
  { value: "sidework", label: "سأقوم بعمل هذا بشكل جانبي (2-4 ساعة)" },
  { value: "available", label: "لدي الكثير من الوقت (5+ ساعات)" },
  { value: "undecided", label: "لم أقرر حتى الان اذا كان لدي وقت" },
];

export default function StepEstimateTime({ form }) {
  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          ما مقدار الوقت الذي يمكنك قضاءه في إنشاء الدورة التدريبية الخاصة بك
          أسبوعيًا؟
        </h2>
        <p className="text-sm text-gray-400 mt-3">
          لا توجد إجابة خاطئة. يمكننا مساعدتك في تحقيق أهدافك حتى لو لم يكن
          لديك الكثير من الوقت.
        </p>
      </div>

      <FormField
        control={form.control}
        name="estimateTime"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-0 max-w-xl mx-auto border border-gray-200 rounded-xl overflow-hidden"
                dir="rtl"
              >
                {timeOptions.map((option, index) => {
                  const isSelected = field.value === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/5"
                          : "hover:bg-gray-50"
                      } ${
                        index < timeOptions.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-gray-700 font-medium">
                        {option.label}
                      </span>
                      <RadioGroupItem value={option.value} />
                    </label>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
