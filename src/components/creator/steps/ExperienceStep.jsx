"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ExperienceStep = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { id: "no_audience", label: "ليس لدي جمهور" },
    { id: "some_audience", label: "لدي بعض الجمهور" },
    { id: "large_audience", label: "لدي جمهور كبير" },
  ];
  return (
    <div className="flex flex-col h-full py-8">
      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-right">
          توسيع نطاق وصولك
        </h2>
        <p className="text-md leading-relaxed text-muted-foreground mb-6 text-right">
          بمجرد نشر محتواك، يمكنك توسيع قاعدة طلابك وأحداث تأثير إيجابي بدعم من
          عروض هاش بلس الترويجية. بالإضافة إلى جهودك التسويقية الخاصة معاً،
          سنساعد الطلاب المناسبين على اكتشاف دورتك.
        </p>

        {/* Options */}
        <Card className="space-y-3 rounded-3xl gap-2">
          <CardHeader className="border-b">
            <CardTitle>
              هل لديك جمهور لمشاركة الدورة التدريبية الخاصة بك معه؟
            </CardTitle>
          </CardHeader>
          <CardContent>
            {options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? " bg-purple-50"
                    : "border-secondary/10 hover:border-secondary/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-gray-800">{option.label}</span>
                </div>
                <input
                  type="radio"
                  name="teachingType"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceStep;
