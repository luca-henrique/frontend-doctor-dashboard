"use client";

import { cn } from "@/lib/utils";

interface StepHeaderProps {
  currentStep: number;
  steps: string[];
}

export function StepHeader({ currentStep, steps }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-col items-center"
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2",
                currentStep > index
                  ? "bg-primary text-primary-foreground border-primary"
                  : currentStep === index
                  ? "border-primary text-primary"
                  : "border-muted-foreground text-muted-foreground"
              )}
            >
              {currentStep > index ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center max-w-28",
                currentStep === index ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            transition: "width 0.3s ease"
          }}
        />
      </div>
    </div>
  );
}
