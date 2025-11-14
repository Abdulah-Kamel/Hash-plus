"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AudienceInfoStep = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    {
      id: "informal",
      label: "شخصيا بشكل غير رسمي",
      description: "",
    },
    {
      id: "formal",
      label: "شخصيا بشكل رسمي",
      description: "",
    },
    {
      id: "online",
      label: "أونلاين",
      description: "",
    },
    {
      id: "other",
      label: "أخرى",
      description: "",
    },
  ];

  return (
    <div className="flex flex-col h-full py-8">
      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-right">شارك معرفتك </h2>
        <p className="text-md leading-relaxed text-muted-foreground mb-6 text-right">
          هاش بلس عبارة عن تجارب تُتيح للطلاب فرصة اكتساب مهارات عملية. سواءً
          كانت لديك خبرة في التدريس أو كانت هذه تجربتك الأولى، سنساعدك على دمج
          معرفتك في دورة إلكترونية تُحسّن حياة الطلاب.
        </p>

        {/* Options */}
        <Card className="space-y-3 rounded-3xl gap-2">
          <CardHeader className="border-b">
            <CardTitle>ما نوع التدريس الذي قمت به من قبل؟</CardTitle>
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

export default AudienceInfoStep;
