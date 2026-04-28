import React from "react";
import Modal from "../common/Model";
import Input from "../common/Input";
import GenericTable from "../common/GenericTable";
import { Search } from "lucide-react";
const ImportDataModel = ({ isOpen, onClose,  data, columns}) => {
  const footerButtons = [
    { label: "Cancel", onClick: onClose, variant: "secondary" },
    {
      label: "Import",
      onClick: () => console.log("Created"),
      variant: "primary",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      data={data}
      columns={columns}
      title="New Contact"
      footerButtons={footerButtons}
      maxWidth="sm">
      <div className="space-y-4 font-['Open_Sans']">
        {/* Search Bar Area */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="px-6 overflow-y-auto flex-1">
          <div className="border rounded-lg overflow-hidden mb-6">
            <GenericTable columns={columns} data={data} actions={false} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ImportDataModel;
