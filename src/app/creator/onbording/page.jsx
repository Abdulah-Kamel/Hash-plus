"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
const page = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const formSchema = z.object({
    contentType: z.enum(["course", "bootcamp"]), // Step 1
    estimateTime: z.string().min(1), // Step 2
    contentName: z.string().min(3), // Step 3
    contentCategory: z.string().min(3), // Step 4
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "",
      estimateTime: "",
      contentName: "",
      contentCategory: "",
    },
  });
  const nextStep = async () => {
    const fields =
      step === 1
        ? ["contentType"]
        : step === 2
          ? ["estimateTime"]
          : step === 3
            ? ["contentName"]
            : ["contentCategory"];

    // const isValid = await form.trigger(fields);
    const isValid = true;
    if (isValid) setStep((s) => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("Final Submission:", data);
    // Call your API here
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step Rendering */}
          {/* {step === 1 && <StepOne form={form} />}
          {step === 2 && <StepTwo form={form} />}
          {step === 3 && <StepThree form={form} />} */}
          {step === 1 && <h1>step 1</h1>}
          {step === 2 && <h1>step 2</h1>}
          {step === 3 && <h1>step 3</h1>}
          {step === 4 && <h1>step 4</h1>}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1}
            >
              Back
            </Button>

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Generate Content</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
