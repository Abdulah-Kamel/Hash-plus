"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useMultiStepStore } from "@/store/useMultiStepStore";
import Link from "next/link";

export default function StepNavigation() {
  const { currentStep, totalSteps, next, back } = useMultiStepStore();

  return (
    <Container className="flex justify-between mt-8">
      <Button
        variant="outline"
        disabled={currentStep === 1}
        onClick={back}
        className="px-14 py-6 rounded-full text-primary hover:text-primary border-primary transition-colors font-medium cursor-pointer shadow-md border-2"
      >
        السابق
      </Button>
      {currentStep === totalSteps ? (
        <Link
          onClick={next}
          className="px-14 py-4 rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white transition-colors font-medium cursor-pointer shadow-md border-2"
          href={"/creator/landing/success"}
        >
          انهاء
        </Link>
      ) : (
        <Button
          variant="outline"
          onClick={next}
          className="px-14 py-6 rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white transition-colors font-medium cursor-pointer shadow-md border-2"
        >
          التالي
        </Button>
      )}
    </Container>
  );
}
