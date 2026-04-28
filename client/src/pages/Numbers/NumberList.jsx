import { Plus, Search, Download, SquarePlusIcon } from "lucide-react";

import Button from "../../components/common/Button";
import BuyNumberModal from "../../components/ui/BuyNumberModal";
import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import GenericTable from "../../components/common/GenericTable";
import { useLocation } from "react-router-dom";

const columns = [
  {
    header: "Phone Number",
    key: "number",
    render: (row) => <span className="uppercase">{row.number}</span>,
  },
  {
    header: " Country Code",
    key: "countryCode",
    render: (row) => <span className="uppercase">{row.countryCode}</span>,
  },
  {
    header: "Status",
    key: "status",
    render: (row) => <span>{row.status}</span>,
  },
];

const contactsData = [
  {
    number: "+1 234 567 890",
    countryCode: "US",
    status: "Active",
  },

  {
    number: "+1 987 654 321",
    countryCode: "US",
    status: "Inactive",
  },
  {
    number: "+1 987 654 321",
    countryCode: "US",
    status: "Inactive",
  },
  {
    number: "+1 987 654 321",
    countryCode: "US",
    status: "Inactive",
  },
];

const NumberList = () => {
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const headerActions = [
    {
      label: "Buy Number",
      onClick: () => handleClick(),
      variant: "primary",
      icon: <SquarePlusIcon size={15} />,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("action") === "add-number") {
      setIsModalOpen(true);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  return (
    <>
      <PageHeader
        title="Numbers"
        subtitle="List of all the phone numbers."
        tooltipText="This is where you manage your phone numbers."
        actions={headerActions}
      />
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 bg-white p-2  border border-[#EEEEF0] ">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-[8px] text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-[8px] text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Download size={18} /> Export CSV
          </button>
        </div>

        <GenericTable columns={columns} data={contactsData} />
        <BuyNumberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={contactsData}
          columns={columns}
        />
        <div className="p-4 border-t border-[#EEEEF0] flex justify-between items-center bg-white">
          <button className="px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50">
            Previous
          </button>
          <span className="text-sm text-gray-500 font-medium">
            Page 1 of 10
          </span>
          <button className="px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NumberList;
