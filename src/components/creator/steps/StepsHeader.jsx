import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StepsHeader = ({ currentStep, totalSteps }) => {
  return (
    <>
      {/* Header */}
      <div className="text-center px-14 py-6">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="w-52 h-12"
              />
            </div>
            <div className="text-base border-r-2 pr-4">
              خطوة {currentStep} من {totalSteps}
            </div>
          </div>
          <Button
            variant="outline"
            className="px-12 py-5 rounded-full text-primary hover:text-primary cursor-pointer"
          >
            الخروج
          </Button>
        </div>
      </div>
      <Progress
        value={(currentStep / totalSteps) * 100}
        className="w-full h-1 bg-secondary/10 [&_[data-slot=progress-indicator]]:bg-secondary"
      />
    </>
  );
};

export default StepsHeader;
