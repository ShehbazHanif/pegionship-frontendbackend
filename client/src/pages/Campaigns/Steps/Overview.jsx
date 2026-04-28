import React, { useState } from "react";
import Input from "../../../components/common/Input";
import { useAgents } from "../../../hooks/useAgents";
import { Select, MenuItem, Checkbox } from "@mui/material";

const Overview = ({ data, update }) => {
  const { data: agentsData } = useAgents();
  const [liveTransferEnabled, setLiveTransferEnabled] = useState(
    data?.liveTransfer?.enabled || false,
  );
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeZones = ["UTC", "EST", "CST", "PST"];
  const agents = agentsData?.data || [];

  const handleInputChange = (field, value) => {
    update((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLiveTransferChange = (field, value) => {
    update((prev) => ({
      ...prev,
      liveTransfer: {
        ...prev.liveTransfer,
        [field]: value,
      },
    }));
  };

  const handleScheduleChange = (field, value) => {
    update((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex-1 p-6 m-3 bg-white border-r-[0.50px] border-zinc-100 ">
      <div className="space-y-4">
        <Input
          label="Campaign name"
          placeholder="Untitled Campaign"
          value={data?.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Agent</label>
          <Select
            value={data?.agent || ""}
            onChange={(e) => handleInputChange("agent", e.target.value)}
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
            <MenuItem value="">Select Agent</MenuItem>
            {agents.map((agent) => (
              <MenuItem
                key={agent._id}
                value={agent._id}
                sx={{
                  "&:hover": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected": { backgroundColor: "#FEFCE8" },
                  "&.Mui-selected:hover": { backgroundColor: "#FEFCE8" },
                }}>
                {agent.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div
        className="inline-flex items-center gap-2 cursor-pointer my-3"
        onClick={() => {
          setLiveTransferEnabled(!liveTransferEnabled);
          handleLiveTransferChange("enabled", !liveTransferEnabled);
        }}>
        <div
          className={`w-9 h-5 p-0.5 rounded-xl flex items-center transition-colors ${
            liveTransferEnabled ? "bg-yellow-400" : "bg-zinc-100"
          }`}>
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
              liveTransferEnabled ? "translate-x-4" : ""
            }`}
          />
        </div>
        <span className="text-zinc-800 text-sm font-medium font-['Open_Sans'] leading-5">
          Add Live Transfer Number
        </span>
      </div>

      {liveTransferEnabled && (
        <div className="grid grid-cols-2 gap-6 my-4 p-4rounded-lg border border-gray-100">
          <Input
            label="Display Name"
            placeholder="Enter display name"
            value={data?.liveTransfer?.displayName || ""}
            onChange={(e) =>
              handleLiveTransferChange("displayName", e.target.value)
            }
          />
          <Input
            label="Transfer Number"
            placeholder="Enter phone number"
            value={data?.liveTransfer?.transferNumber || ""}
            onChange={(e) =>
              handleLiveTransferChange("transferNumber", e.target.value)
            }
          />
        </div>
      )}

      <div className="pt-6 border-t border-gray-50">
        <h3 className="font-bold text-lg ">Campaign Schedule</h3>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Input
            label="Overall Duration"
            type="date"
            icon="calendar"
            value={data?.schedule?.duration || ""}
            onChange={(e) => handleScheduleChange("duration", e.target.value)}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Timezone
            </label>
            <Select
              value={data?.schedule?.timezone || ""}
              onChange={(e) => handleScheduleChange("timezone", e.target.value)}
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
              {timeZones.map((tz) => (
                <MenuItem
                  key={tz}
                  value={tz}
                  sx={{
                    "&:hover": { backgroundColor: "#FEFCE8" },
                    "&.Mui-selected": { backgroundColor: "#FEFCE8" },
                    "&.Mui-selected:hover": { backgroundColor: "#FEFCE8" },
                  }}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-700">
            Select Working Days and Schedule
          </p>
          {days.map((day) => (
            <div
              key={day}
              className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-lg border border-transparent">
              <Checkbox
                checked={data?.schedule?.[day]?.enabled || false}
                onChange={(e) =>
                  handleScheduleChange(day, {
                    ...data?.schedule?.[day],
                    enabled: e.target.checked,
                  })
                }
                sx={{
                  color: "#D1D5DB",
                  "&.Mui-checked": {
                    color: "#FBBF24",
                  },
                }}
              />
              <span className="w-24 text-sm font-medium text-gray-600">
                {day}
              </span>
              <div className="flex-1 relative">
                <input
                  type="time"
                  className="w-[500px] pl-2 pr-3 py-2 bg-white border rounded border-gray-200 text-sm outline-none focus:border-primary focus:ring-yellow-50"
                  value={data?.schedule?.[day]?.start || ""}
                  onChange={(e) =>
                    handleScheduleChange(day, {
                      ...data?.schedule?.[day],
                      start: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="flex-1 relative">
                <Clock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="time"
                  className="w-full pl-10 pr-3 py-2 bg-white border rounded border-gray-200 text-sm outline-none focus:border-primary focus:ring-yellow-50"
                  value={data?.schedule?.[day]?.end || ""}
                  onChange={(e) =>
                    handleScheduleChange(day, {
                      ...data?.schedule?.[day],
                      end: e.target.value,
                    })
                  }
                />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
