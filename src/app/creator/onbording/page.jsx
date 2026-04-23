"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createContent } from "@/actions/contentActions";
import StepContentType from "@/components/creator/onbording/StepContentType";
import StepEstimateTime from "@/components/creator/onbording/StepEstimateTime";
import StepContentName from "@/components/creator/onbording/StepContentName";
import StepContentCategory from "@/components/creator/onbording/StepContentCategory";
import StepsHeader from "@/components/creator/steps/StepsHeader";

const formSchema = z.object({
  contentType: z.enum(["course", "bootcamp"], {
    required_error: "يرجى اختيار نوع المحتوى",
  }),
  estimateTime: z.string().min(1, "يرجى اختيار الوقت المتاح"),
  contentName: z.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل"),
  contentDescription: z.string().min(10, "يجب أن يكون الوصف 10 أحرف على الأقل"),
  contentCategory: z.string().min(1, "يرجى اختيار التصنيف"),
});

const Page = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "",
      estimateTime: "",
      contentName: "",
      contentDescription: "",
      contentCategory: "",
    },
  });

  const stepFields = {
    1: ["contentType"],
    2: ["estimateTime"],
    3: ["contentName", "contentDescription"],
    4: ["contentCategory"],
  };

  const nextStep = async () => {
    const fields = stepFields[step];
    const isValid = await form.trigger(fields);
    if (isValid) setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Build the content payload matching the API schema
      const payload = {
        contentType: data.contentType,
        title: data.contentName,
        category: data.contentCategory,
        description: data.contentDescription,
        level: "beginner",
        language: "ar",
        price: {
          amount: 0,
          currency: "SAR",
        },
      };

      // Add bootcamp-specific fields
      if (data.contentType === "bootcamp") {
        payload.startDate = new Date().toISOString().split("T")[0];
        payload.endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        payload.totalProjects = 0;
      }

    
      const res = await createContent(payload);

      if (res.success) {
        const contentId = res.data?.data?._id;
        if (contentId) {
          router.push(`/creator/content/${contentId}`);
        } else {
          router.push("/creator/home");
        }
      } else {
        console.error("Failed to create content:", res.error);
      }
    } catch (err) {
      console.error("Error submitting content:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Reuse the existing StepsHeader component */}
      <StepsHeader currentStep={step} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center pt-16 px-6">
        <div className="w-full max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Step Content */}
              <div className="min-h-[400px] flex flex-col justify-start">
                {step === 1 && <StepContentType form={form} />}
                {step === 2 && <StepEstimateTime form={form} />}
                {step === 3 && <StepContentName form={form} />}
                {step === 4 && <StepContentCategory form={form} />}
              </div>
            </form>
          </Form>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="px-6 py-4 border-t border-gray-100">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          {step < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-sm font-medium cursor-pointer"
            >
              التالي
            </Button>
          ) : (
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? "جاري الإنشاء..." : "ابدأ الان"}
            </Button>
          )}

          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-gray-300 text-gray-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              العودة
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Page;
