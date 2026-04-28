import React from "react";
import Modal from "../common/Model";
import Input from "../common/Input";
import GenericTable from "../common/GenericTable";
import { Search } from "lucide-react";
const columns = [
  {
    header: "Phone Number",
    key: "number",
    render: (row) => <span className="uppercase">{row.number}</span>,
  },
  {
    header: "Locality",
    key: "locality",
    render: (row) => <span className="uppercase">{row.locality}</span>,
  },
  {
    header: "Region",
    key: "region",
    render: (row) => <span>{row.region}</span>,
  },
  {
    header: "Address Requirements",
    key: "addressReq",
    render: (row) => <span>{row.addressReq}</span>,
  },
];

const contactsData = [
  {
    number: "+1 234 567 890",
    locality: "New York",
    region: "NY",
    addressReq: "Standard",
  },
  {
    number: "+1 987 654 321",
    locality: "LA",
    region: "CA",
    addressReq: "Standard",
  },
  {
    number: "+1 555 555 555",
    locality: "Chicago",
    region: "IL",
    addressReq: "Standard",
  },
];
const BuyNumberModal = ({ isOpen, onClose }) => {
  const footerButtons = [
    { label: "Cancel", onClick: onClose, variant: "secondary" },
    {
      label: "Buy",
      onClick: () => console.log("Created"),
      variant: "primary",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose a Phone Number"
      footerButtons={footerButtons}
      maxWidth="sm">
      <div className="space-y-4 font-['Open_Sans']">
        <div className="p-6 pb-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className=" pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <GenericTable columns={columns} data={contactsData} actions={false} />
      </div>
    </Modal>
  );
};
export default BuyNumberModal;
