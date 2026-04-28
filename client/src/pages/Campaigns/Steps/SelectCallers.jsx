import React, { useState } from "react";
import { Search } from "lucide-react";
import { Checkbox } from "@mui/material";
import { useAgents } from "../../../hooks/useAgents";

const SelectCallers = ({ data, update }) => {
  const { data: agentsData } = useAgents();
  const [searchTerm, setSearchTerm] = useState("");

  const agents = agentsData?.data || [];
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectAgent = (agentId) => {
    update((prev) => {
      const isSelected = prev.selectedCallers.includes(agentId);
      return {
        ...prev,
        selectedCallers: isSelected
          ? prev.selectedCallers.filter((id) => id !== agentId)
          : [...prev.selectedCallers, agentId],
      };
    });
  };

  const handleSelectAll = (e) => {
    update((prev) => ({
      ...prev,
      selectedCallers: e.target.checked ? agents.map((a) => a._id) : [],
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="border border-[#EEEEF0] rounded-[12px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-[#EEEEF0]">
            <tr>
              <th className="p-4 w-12">
                <Checkbox
                  checked={
                    agents.length > 0 &&
                    agents.every((a) => data?.selectedCallers?.includes(a._id))
                  }
                  onChange={handleSelectAll}
                  sx={{
                    color: "#D1D5DB",
                    "&.Mui-checked": {
                      color: "#FBBF24",
                    },
                  }}
                />
              </th>
              <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                AI Assistants
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEEF0] bg-white">
            {filteredAgents.map((agent) => (
              <tr key={agent._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <Checkbox
                    checked={
                      data?.selectedCallers?.includes(agent._id) || false
                    }
                    onChange={() => handleSelectAgent(agent._id)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": {
                        color: "#FBBF24",
                      },
                    }}
                  />
                </td>
                <td className="p-4 text-sm text-gray-600">{agent.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectCallers;
