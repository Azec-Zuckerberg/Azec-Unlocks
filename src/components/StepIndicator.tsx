import React from "react";

interface StepIndicatorProps {
  current: number; // 1-based
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ current, steps }) => (
  <div className="flex items-center gap-6 mb-8">
    {steps.map((step, i) => {
      const stepNumber = i + 1;
      const active = stepNumber === current;
      return (
        <div key={step} className="flex flex-col items-center text-xs">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2
                        ${active ? "border-blue-500 bg-blue-500 text-black font-bold" : "border-white/30 text-white/60"}
                        transition-colors`}
          >
            {stepNumber}
          </span>
          <span
            className={`mt-1 font-semibold ${
              active ? "text-white" : "text-white/60"
            }`}
          >
            {step}
          </span>
        </div>
      );
    })}
  </div>
);

export default StepIndicator; 