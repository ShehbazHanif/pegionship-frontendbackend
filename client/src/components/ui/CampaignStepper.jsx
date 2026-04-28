import React from "react";
import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Select Callers" },
  { id: 3, label: "Select Contacts" },
  { id: 4, label: "Start Campaign" },
];


const CampaignStepper = ({ currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
         
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => onStepClick(step.id)}>
              <span
                className={`text-sm font-bold whitespace-nowrap transition-colors 
                ${
                  isActive
                    ? "text-secondary underline decoration-primary decoration-2 underline-offset-8"
                    : isCompleted
                      ? "text-secondary hover:text-primary"
                      : "text-gray-400 hover:text-gray-600"
                }`}>
                {step.label}
              </span>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 
                ${
                  isCompleted
                    ? "bg-primary border-primary text-secondary"
                    : isActive
                      ? "border-primary text-primary bg-white shadow-sm"
                      : "border-gray-200 text-gray-400 bg-white group-hover:border-gray-300"
                }`}>
                {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-[1px] bg-gray-100 min-w-[30px]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CampaignStepper;
