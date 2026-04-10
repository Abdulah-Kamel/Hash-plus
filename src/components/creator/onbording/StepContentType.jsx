"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, BookOpen, Tent } from "lucide-react";

const contentTypes = [
  {
    value: "course",
    label: "دورة",
    description:
      "محتوى عبارة عن اجتماعات خارجية من خلال روابط تقدم من خلال منصة هاش بلس و تتيح للطالب بالمتابعة من خلالها",
    icon: GraduationCap,
  },
  {
    value: "bootcamp",
    label: "معسكر",
    description:
      "محتوى عبارة عن اجتماعات خارجية من خلال روابط تقدم من خلال منصة هاش بلس و تتيح للطالب بالمتابعة من خلالها",
    icon: Tent,
  },
];

export default function StepContentType({ form }) {
  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          أولاً، دعنا نكتشف نوع المحتوى الذي تقوم بإنشائه.
        </h2>
      </div>

      <FormField
        control={form.control}
        name="contentType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
                dir="rtl"
              >
                {contentTypes.map((type) => {
                  const isSelected = field.value === type.value;
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col items-end p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem
                        value={type.value}
                        className="absolute top-4 left-4"
                      />
                      <div className="w-full text-right">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {type.label}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
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
