"use client";
import { useMultiStepStore } from "@/store/useMultiStepStore";
import StepNavigation from "./StepNavigation";
import Container from "@/components/container";
import StepsHeader from "../../steps/StepsHeader";

export default function MultiStepForm({ steps }) {
  const { currentStep, totalSteps } = useMultiStepStore();

  return (
    <div className="min-h-screen flex flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Container className="max-w-4xl mx-2 pt-12">{steps[currentStep - 1]}</Container>
      <div className="pb-8">
        <StepNavigation />
      </div>
    </div>
  );
}
