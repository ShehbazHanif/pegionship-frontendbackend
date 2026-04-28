import React, { useState, useEffect } from "react";
import { ArrowRight, MoveLeft } from "lucide-react";
import AdvancedSettings from "../../components/ui/AdvancedSettings";
import IdentityStep from "./IdentityStep";
import ConfigurationStep from "./ConfigurationStep";
import Button from "../../components/common/Button";
import { useAgent } from "../../hooks/useAgents";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateAgentWithNotification,
  useUpdateAgentWithNotification,
} from "../../hooks/useServicesWithNotification";
import { useNotification } from "../../context/NotificationContext";

const CreateAgentWizard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEditMode = !!id;

  const { data: agentData, isLoading: isLoadingAgent } = useAgent(id);
  const { mutate: submitAgent, isPending: isCreating } =
    useCreateAgentWithNotification({
      onSuccess: () => navigate("/agents"),
    });
  const { mutate: updateAgent, isPending: isUpdating } =
    useUpdateAgentWithNotification({
      onSuccess: () => navigate("/agents"),
    });

  const isPending = isCreating || isUpdating;

  const [step, setStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    voice: "American Male",
    languages: "English",
    openingMessage: "",
    qualificationScenario: "",
    goal: "",
    background: "",
    exampleConversation: "",
    status: "Draft",
  });

  useEffect(() => {
    if (isEditMode && agentData?.data) {
      const agent = agentData.data;
      setFormData({
        name: agent.name || "",
        voice: agent.voice || "American Male",
        languages: agent.languages || "English",
        openingMessage: agent.openingMessage || "",
        qualificationScenario: agent.qualificationScenario || "",
        goal: agent.goal || "",
        background: agent.background || "",
        exampleConversation: agent.exampleConversation || "",
        status: agent.status || "Draft",
      });
    }
  }, [agentData, isEditMode]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.voice || !formData.languages) {
        showNotification(
          "Please fill all required fields in this step",
          "error",
        );
        return;
      }
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      updateAgent({ id, data: formData });
    } else {
      submitAgent(formData);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? Any unsaved changes will be lost.")) {
      navigate("/agents");
    }
  };

  const handleBack = () => setStep(1);

  if (isEditMode && isLoadingAgent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading agent data...</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white font-['Open_Sans'] flex flex-col min-h-screen ${step === 2 ? "pb-20" : ""}`}>
      <div className="flex flex-col items-start px-8 py-4 bg-white border-b border-gray-100">
        <button
          className="flex items-center gap-2 text-[#717386] hover:text-gray-900 transition-colors mb-2"
          onClick={() => (step === 2 ? setStep(1) : window.history.back())}>
          <MoveLeft size={16} strokeWidth={1.5} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-[#2E2E36] font-['Lato'] text-[24px] font-bold leading-[32px]">
              {isEditMode ? "Edit Agent" : "Create Agent"}
            </h1>
            <p className="text-[#717386] font-['Open_Sans'] text-[14px] font-normal">
              {isEditMode
                ? "Update your AI agent identity and behavior"
                : "Configure your AI agent identity and behavior"}
            </p>
          </div>

          {step === 2 && (
            <div>
              <Button
                onClick={() => setShowAdvanced(true)}
                variant="white"
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
                Advanced Settings
              </Button>
            </div>
          )}
        </div>

        <div className="w-full max-w-[1200px] py-2 flex items-center gap-4 mt-2">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setStep(1)}>
            <span
              className={`text-sm font-medium transition-colors ${step === 1 ? "text-yellow-500 underline underline-offset-8 decoration-2" : "text-gray-400 group-hover:text-gray-600"}`}>
              Select Identity
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${step === 1 ? "bg-yellow-400 font-bold" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"}`}>
              1
            </div>
          </div>

          <div className="h-[1px] w-12 bg-zinc-100" />

          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setStep(2)}>
            <span
              className={`text-sm font-medium transition-colors ${step === 2 ? "text-yellow-500 underline underline-offset-8 decoration-2" : "text-gray-400 group-hover:text-gray-600"}`}>
              Full Configuration
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${step === 2 ? "bg-yellow-400 font-bold" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"}`}>
              2
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full p-4 bg-gray-100">
        {step === 1 ? (
          <IdentityStep formData={formData} onFormChange={handleFormChange} />
        ) : (
          <ConfigurationStep
            formData={formData}
            onFormChange={handleFormChange}
          />
        )}

        {step === 1 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 rounded-lg text-sm font-bold text-zinc-800 shadow-sm hover:bg-yellow-500 transition-colors disabled:opacity-50">
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}
      </main>

      {step === 2 && (
        <footer className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-gray-100 p-4 flex justify-between items-center px-12 z-50">
          <button
            onClick={isEditMode ? handleCancel : handleBack}
            disabled={isPending}
            className="px-6 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-gray-50 transition-all disabled:opacity-50">
            {isEditMode ? "Cancel" : "Back"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-2 px-8 py-2 bg-yellow-400 rounded-lg text-sm font-bold text-zinc-800 shadow-sm hover:bg-yellow-500 transition-colors disabled:opacity-50">
            {isPending ? "Submitting..." : isEditMode ? "Update" : "Submit"}{" "}
            <ArrowRight size={18} />
          </button>
        </footer>
      )}

      <AdvancedSettings
        isOpen={showAdvanced}
        onClose={() => setShowAdvanced(false)}
      />
    </div>
  );
};

export default CreateAgentWizard;
