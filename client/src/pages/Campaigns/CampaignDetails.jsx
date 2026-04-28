import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GenericTable from "../../components/common/GenericTable";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import { useCampaign } from "../../hooks/useCampaigns";
import { MoveLeft } from "lucide-react";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: campaignData, isLoading, error } = useCampaign(id);

  const campaign = campaignData?.data;

  const getTableData = () => {
    if (!campaign) return [];

    return [
      { key: "Name", value: campaign.name },
      { key: "Status", value: campaign.status },
      { key: "Total Contacts", value: campaign.totalContacts },
      { key: "Response Percentage", value: `${campaign.responsePercentage}%` },
      {
        key: "Agent",
        value:
          typeof campaign.agent === "object"
            ? campaign.agent?.name
            : campaign.agent,
      },
      {
        key: "Selected Callers",
        value: Array.isArray(campaign.selectedCallers)
          ? campaign.selectedCallers.length
          : 0,
      },
      {
        key: "Created At",
        value: new Date(campaign.createdAt).toLocaleString(),
      },
      {
        key: "Updated At",
        value: new Date(campaign.updatedAt).toLocaleString(),
      },
    ];
  };

  const columns = [
    {
      header: "Field",
      key: "key",
      render: (row) => (
        <span className="font-medium text-gray-700">{row.key}</span>
      ),
    },
    {
      header: "Value",
      key: "value",
      render: (row) => <span className="text-gray-600">{row.value}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title="Campaign Details"
        subtitle="View campaign information"
        tooltipText="Complete campaign details and statistics"
      />
      <div className="p-8">
        <button
          onClick={() => navigate("/campaigns")}
          className="flex items-center gap-2 text-[#717386] hover:text-gray-900 transition-colors mb-6">
          <MoveLeft size={16} strokeWidth={1.5} />
          <span className="text-sm font-medium">Back to Campaigns</span>
        </button>

        {isLoading ? (
          <div className="text-center">Loading campaign details...</div>
        ) : error ? (
          <div className="text-center text-red-600">
            Failed to load campaign details
          </div>
        ) : campaign ? (
          <div className="bg-white rounded-[12px] border border-[#EEEEF0] overflow-hidden">
            <GenericTable
              columns={columns}
              data={getTableData()}
              actions={false}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">Campaign not found</div>
        )}
      </div>
    </>
  );
};

export default CampaignDetails;
