import {
  Search,
  Download,
  SquarePlusIcon,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
} from "lucide-react";
import SummaryCard from "../../components/ui/SummaryCard";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import GenericTable from "../../components/common/GenericTable";
import { useCampaigns } from "../../hooks/useCampaigns";
import { useDeleteCampaignWithNotification } from "../../hooks/useServicesWithNotification";
import { useState } from "react";

const columns = [
  {
    header: "Campaign Name",
    key: "name",
    render: (row) => (
      <div className="flex items-center gap-3">
        <span className="font-medium text-zinc-800 font-['Open_Sans'] uppercase">
          {row.name}
        </span>
      </div>
    ),
  },
  {
    header: "Total Contacts",
    key: "totalContacts",
    render: (row) => (
      <span className="text-[#667085] text-sm uppercase">
        {row.totalContacts}
      </span>
    ),
  },
  {
    header: "Response Percentage",
    key: "responsePercentage",
    render: (row) => (
      <span className="text-[#667085] text-sm">{row.responsePercentage}</span>
    ),
  },
  {
    header: "Created Date & Time",
    key: "createdAt",
    render: (row) => (
      <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-[11px] font-medium">
        {row.createdAt}
      </span>
    ),
  },
  {
    header: "Status",
    key: "status",
    render: (row) => (
      <span className="text-[#667085] text-sm">{row.status}</span>
    ),
  },
];

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useCampaigns();
  const { mutate: deleteCampaign } = useDeleteCampaignWithNotification();
  const navigate = useNavigate();

  const headerActions = [
    {
      label: "Create campaign",
      onClick: () => navigate("/campaigns/createcampaign"),
      variant: "primary",
      icon: <SquarePlusIcon size={15} />,
    },
  ];

  const handleEdit = (campaign) => {
    navigate(`/campaigns/editCampaignWizard/${campaign._id}`);
  };

  const handleDelete = (campaign) => {
    deleteCampaign(campaign._id);
  };

  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  };

  const totalContacts = (data?.data || []).reduce(
    (sum, campaign) => sum + (campaign.totalContacts || 0),
    0,
  );

  const campaignCount = (data?.data || []).length;
  const avgResponsePercentage =
    campaignCount > 0
      ? Math.round(
          (data?.data || []).reduce(
            (sum, campaign) => sum + (campaign.responsePercentage || 0),
            0,
          ) / campaignCount,
        )
      : 0;

  return (
    <>
      <PageHeader
        title="Campaigns"
        subtitle="List of all the campaigns."
        tooltipText="This is where you manage your campaigns."
        actions={headerActions}
      />
      <div className="p-8">
        {isLoading ? (
          <div className="text-center">Loading campaigns...</div>
        ) : error ? (
          <div className="text-center text-red-600">
            Failed to load campaigns
          </div>
        ) : (
          <>
            <div className="pb-6 flex flex-wrap gap-4">
              <SummaryCard
                label="Total Campaigns"
                value={data?.pagination?.totalItems || 0}
              />
              <SummaryCard label="Total Contacts" value={totalContacts} />
              <SummaryCard
                label="Completion Rate"
                value={`${avgResponsePercentage}%`}
              />
            </div>

            <div className="bg-white rounded-[12px] border border-[#EEEEF0] overflow-hidden">
              <div className=" flex flex-col md:flex-row gap-4 items-center justify-end bg-white p-4 rounded-card border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-px text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-px hover:bg-gray-50 transition-colors">
                  <ArrowDownToLine size={16} /> Exports CSV
                </button>
              </div>
              <GenericTable
                columns={columns}
                data={data?.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <div className="p-4 border-t border-[#EEEEF0] flex justify-between items-center bg-white">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-sm text-gray-500 font-medium">
                  Page {pagination.currentPage} of {pagination.totalPages} |
                  Total: {pagination.totalItems}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage >= (pagination.totalPages || 1) || isLoading
                  }
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CampaignList;
