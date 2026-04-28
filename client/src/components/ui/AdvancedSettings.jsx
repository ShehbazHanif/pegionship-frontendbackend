import React, { useState } from "react";
import { Info } from "lucide-react";
import Modal from "../common/Model";

const SettingSlider = ({ label, value, onChange }) => (
  <div className="w-full flex flex-col gap-1.5 py-2">
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-zinc-800 text-sm font-medium font-['Open_Sans']">
          {label}
        </span>
        <Info size={16} className="text-gray-400" />
      </div>
      <div className="flex-1 flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-yellow-400"
        />
        <span className="text-zinc-800 text-sm font-medium min-w-[24px]">
          {value}
        </span>
      </div>
    </div>
  </div>
);

const PatienceLevel = ({ level, time, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex-1 px-4 py-3 rounded-xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
      isSelected
        ? "border-yellow-400 bg-yellow-50"
        : "border-zinc-100 bg-white hover:border-zinc-200"
    }`}>
    <div className="text-zinc-800 text-sm font-bold">{level}</div>
    <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">
      {time}
    </div>
  </div>
);

const AdvancedSettings = ({ isOpen, onClose }) => {
  const [styleExaggeration, setStyleExaggeration] = useState(4);
  const [maxIdleDuration, setMaxIdleDuration] = useState(0);
  const [initialPause, setInitialPause] = useState(0);
  const [patienceLevel, setPatienceLevel] = useState("medium");

  const footerButtons = [
    {
      label: "Cancel",
      onClick: onClose,
      variant: "white",
    },
    {
      label: "Save",
      onClick: onClose,
      variant: "primary",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Settings"
      footerButtons={footerButtons}
      maxWidth="sm">
      <div className="flex flex-col gap-6 py-4">
        <p className="text-gray-500 text-sm">
          Access your advance settings here
        </p>

        <div className="space-y-6">
          <SettingSlider
            label="Style Exaggeration"
            value={styleExaggeration}
            onChange={setStyleExaggeration}
          />
          <SettingSlider
            label="Max Idle Duration"
            value={maxIdleDuration}
            onChange={setMaxIdleDuration}
          />
          <SettingSlider
            label="Initial pause before speaking"
            value={initialPause}
            onChange={setInitialPause}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-800 text-sm font-bold">
              Patience level
            </span>
            <p className="text-gray-500 text-xs font-['Open_Sans']">
              Adjust the response speed
            </p>
          </div>

          <div className="flex justify-between gap-3">
            <PatienceLevel
              level="Low"
              time="-1 sec"
              isSelected={patienceLevel === "low"}
              onClick={() => setPatienceLevel("low")}
            />
            <PatienceLevel
              level="Medium"
              time="-3 sec"
              isSelected={patienceLevel === "medium"}
              onClick={() => setPatienceLevel("medium")}
            />
            <PatienceLevel
              level="High"
              time="-5 sec"
              isSelected={patienceLevel === "high"}
              onClick={() => setPatienceLevel("high")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedSettings;
