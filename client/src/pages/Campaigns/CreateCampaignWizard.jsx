import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CampaignStepper from "../../components/ui/CampaignStepper";
import Overview from "./Steps/Overview";
import SelectCallers from "./Steps/SelectCallers";
import SelectContacts from "./Steps/SelectContacts";
import Launch from "./Steps/Launch";
import Button from "../../components/common/Button";
import { Save } from "lucide-react";
import { MoveLeft } from "lucide-react";
import { useCampaign } from "../../hooks/useCampaigns";
import {
  useCreateCampaignWithNotification,
  useUpdateCampaignWithNotification,
} from "../../hooks/useServicesWithNotification";
import { useNotification } from "../../context/NotificationContext";

const CreateCampaignWizard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEditMode = !!id;

  const { data: campaignData, isLoading: isCampaignLoading } = useCampaign(id);
  const { mutate: createCampaign, isPending: isCreating } =
    useCreateCampaignWithNotification({
      onSuccess: () => navigate("/campaigns"),
    });
  const { mutate: updateCampaign, isPending: isUpdating } =
    useUpdateCampaignWithNotification({
      onSuccess: () => navigate("/campaigns"),
    });

  const isPending = isCreating || isUpdating;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    agent: "",
    schedule: {},
    selectedCallers: [],
    selectedContacts: [],
    status: "Draft",
  });

  useEffect(() => {
    if (isEditMode && campaignData?.data) {
      const campaign = campaignData.data;
      setFormData({
        name: campaign.name || "",
        agent: campaign.agent?._id || "",
        schedule: campaign.schedule || {},
        selectedCallers: campaign.selectedCallers?.map((c) => c._id) || [],
        selectedContacts: campaign.selectedContacts?.map((c) => c._id) || [],
        status: campaign.status || "Draft",
      });
    }
  }, [campaignData, isEditMode]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleLaunch = () => {
    if (!formData.name || !formData.agent) {
      showNotification(
        "Please fill in campaign name and select an agent",
        "error",
      );
      return;
    }

    const payload = { ...formData, status: "Active" };

    if (isEditMode) {
      updateCampaign({ id, data: payload });
    } else {
      createCampaign(payload);
    }
  };

  const handleSaveDraft = () => {
    if (!formData.name || !formData.agent) {
      showNotification(
        "Please fill in campaign name and select an agent",
        "error",
      );
      return;
    }

    const payload = { ...formData, status: "Draft" };

    if (isEditMode) {
      updateCampaign({ id, data: payload });
    } else {
      createCampaign(payload);
    }
  };

  if (isEditMode && isCampaignLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading campaign...</div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Overview data={formData} update={setFormData} />;
      case 2:
        return <SelectCallers data={formData} update={setFormData} />;
      case 3:
        return <SelectContacts data={formData} update={setFormData} />;
      case 4:
        return <Launch data={formData} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-start px-8 py-4 bg-white border-b border-gray-100">
        <button
          className="flex items-center gap-2 text-[#717386] hover:text-gray-900 transition-colors mb-2"
          onClick={() => window.history.back()}>
          <MoveLeft size={16} strokeWidth={1.5} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="">
          <h1 className="text-[#2E2E36] font-['Lato'] text-[24px] font-bold leading-[32px]">
            {isEditMode ? "Edit Campaign" : "Create Campaign"}
          </h1>
          <p className="text-[#717386] font-['Open_Sans'] text-[14px] font-normal">
            {isEditMode
              ? "Update your campaign details"
              : "Create your own campaign"}
          </p>
        </div>

        <div className="w-full">
          <CampaignStepper
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-24 ">{renderStep()}</div>

      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-gray-100 p-4 flex justify-between items-center px-12 z-50">
        <Button
          variant="white"
          onClick={prevStep}
          disabled={isPending}
          className={currentStep === 1 ? "invisible" : ""}>
          Back
        </Button>

        <div className="flex gap-3">
          <Button
            variant="white"
            icon={Save}
            onClick={handleSaveDraft}
            disabled={isPending}
            className="border border-gray-200">
            {isEditMode ? "Update Draft" : "Save Draft"}
          </Button>
          <Button
            variant="primary"
            disabled={isPending}
            className="bg-[#FACC15] text-black hover:bg-yellow-500 flex items-center gap-2"
            onClick={currentStep === 4 ? handleLaunch : nextStep}>
            {isPending
              ? "Processing..."
              : currentStep === 4
                ? isEditMode
                  ? "Update"
                  : "Launch"
                : "Next"}
            <span className="text-lg">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignWizard;
