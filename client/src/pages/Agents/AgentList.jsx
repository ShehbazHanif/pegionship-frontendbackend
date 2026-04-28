import React, { useState } from "react";

import { Plus, Search, SquarePlusIcon } from "lucide-react";
import Button from "../../components/common/Button";
import AgentCard from "../../components/ui/AgentCard";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { useAgents } from "../../hooks/useAgents";
import { useDeleteAgentWithNotification } from "../../hooks/useServicesWithNotification";

const AgentList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: agentsData, isLoading, error } = useAgents(page, 10);
  const { mutate: deleteAgent } = useDeleteAgentWithNotification();

  const handleClick = () => {
    navigate("/agents/createAgentWizard");
  };

  const handleDeleteAgent = (id) => {
    deleteAgent(id);
  };

  const headerActions = [
    {
      label: "Create Agent",
      onClick: () => handleClick(),
      variant: "primary",
      icon: <SquarePlusIcon size={15} />,
    },
  ];

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="Agents"
          subtitle="List of all the agents."
          tooltipText="This is where you manage your AI agents."
          actions={headerActions}
        />
        <div className="p-8 text-center">Loading agents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Agents"
          subtitle="List of all the agents."
          tooltipText="This is where you manage your AI agents."
          actions={headerActions}
        />
        <div className="p-8 text-center text-red-600">
          Failed to load agents
        </div>
      </div>
    );
  }

  const agents = agentsData?.data || [];
  const pagination = agentsData?.pagination || {};

  return (
    <div>
      <PageHeader
        title="Agents"
        subtitle="List of all the agents."
        tooltipText="This is where you manage your AI agents."
        actions={headerActions}
      />

      {agents.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No agents found</div>
      ) : (
        <div className="p-8 flex flex-wrap gap-6 ">
          {agents.map((agent) => (
            <AgentCard
              key={agent._id}
              agent={agent}
              onDelete={() => handleDeleteAgent(agent._id)}
            />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-4 p-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentList;
