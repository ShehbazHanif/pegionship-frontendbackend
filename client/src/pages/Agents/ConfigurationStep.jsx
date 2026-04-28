import React from "react";
import Input from "../../components/common/Input";
import { ChevronDown } from "lucide-react";
import { Select, MenuItem } from "@mui/material";

const SelectInput = ({ label, value, options, onChange, ...props }) => (
  <div className="w-full relative">
    <label className="text-sm font-medium text-gray-700 block mb-1.5">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-yellow-400 appearance-none cursor-pointer"
      {...props}>
      {options?.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown
      size={18}
      className="absolute right-4 top-[38px] text-gray-400 pointer-events-none"
    />
  </div>
);

const TextArea = ({ label, value, onChange, inputClassName, ...props }) => (
  <div className="w-full space-y-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-yellow-400 min-h-[100px] resize-none ${inputClassName}`}
      {...props}
    />
  </div>
);

const ConfigurationStep = ({ formData, onFormChange }) => {
  const voiceOptions = [
    "American Male",
    "American Female",
    "British Male",
    "British Female",
    "Australian Male",
    "Australian Female",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];

  return (
    <div className="m-2 animate-in fade-in duration-500 max-h-[calc(100vh-350px)] overflow-y-auto pr-4 custom-scrollbar">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Input
          label="Full Name"
          placeholder="Olivia"
          value={formData?.name || ""}
          onChange={(e) => onFormChange("fullName", e.target.value)}
        />
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Voice
          </label>
          <Select
            value={formData?.voice || "American Male"}
            onChange={(e) => onFormChange("voice", e.target.value)}
            sx={{
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: "white",
              borderRadius: "0.5rem",

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fbbf24",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fbbf24",
                borderWidth: "2px",
              },
            }}>
            {voiceOptions.map((opt) => (
              <MenuItem
                key={opt}
                value={opt}
                sx={{
                  "&:hover": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected:hover": { backgroundColor: "#FEFCE8" },
                }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Input
          label="Opening Message"
          placeholder="Hey there, How can I assist you?"
          value={formData?.openingMessage || ""}
          onChange={(e) => onFormChange("openingMessage", e.target.value)}
        />
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Languages
          </label>
          <Select
            value={formData?.languages || "American Male"}
            onChange={(e) => onFormChange("languages", e.target.value)}
            sx={{
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: "white",
              borderRadius: "0.5rem",

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fbbf24",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fbbf24",
                borderWidth: "2px",
              },
            }}>
            {languageOptions.map((opt) => (
              <MenuItem
                key={opt}
                value={opt}
                sx={{
                  "&:hover": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected:hover": { backgroundColor: "#FEFCE8" },
                }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <TextArea
          label="Qualification scenario"
          placeholder="Lorem ipsum dolor sit amet consectetur..."
          value={formData?.qualificationScenario || ""}
          onChange={(value) => onFormChange("qualificationScenario", value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <TextArea
          label="Goal"
          placeholder="Define your agent's goal..."
          value={formData?.goal || ""}
          onChange={(value) => onFormChange("goal", value)}
        />
        <TextArea
          label="Background"
          placeholder="Define background..."
          value={formData?.background || ""}
          onChange={(value) => onFormChange("background", value)}
        />
      </div>

      <div className="mb-4">
        <TextArea
          label="Example Conversation (Optional)"
          placeholder="Add a sample chat..."
          value={formData?.exampleConversation || ""}
          onChange={(value) => onFormChange("exampleConversation", value)}
        />
      </div>
    </div>
  );
};

export default ConfigurationStep;
