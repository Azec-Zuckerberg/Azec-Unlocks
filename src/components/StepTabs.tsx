import React from "react";

interface StepTabsProps {
  /** 1-based index of the current step (1, 2, or 3) */
  current: 1 | 2 | 3;
}

const labels = ["Order Information", "Confirm & Pay", "Receive Your Items"];

const StepTabs: React.FC<StepTabsProps> = ({ current }) => (
  <div className="mb-12 flex w-full justify-between text-xs font-semibold">
    {labels.map((label, i) => {
      const step   = i + 1;
      const active = step === current;

      return (
        <div key={label} className="flex w-full flex-col items-start">
          <span
            className={`uppercase tracking-wide ${
              active ? "text-blue-400" : "text-white/40"
            }`}
          >
            Step {step}
          </span>
          <span className={active ? "text-white" : "text-white/60"}>{label}</span>
          <div
            className={`mt-2 h-0.5 w-full ${
              active ? "bg-blue-500" : "bg-transparent"
            }`}
          />
        </div>
      );
    })}
  </div>
);

export default StepTabs; 