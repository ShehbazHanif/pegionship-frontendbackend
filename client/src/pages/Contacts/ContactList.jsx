import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SquarePlus,
  Search,
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import GenericTable from "../../components/common/GenericTable";
import Button from "../../components/common/Button";
import AddContactModal from "../../components/ui/AddContactModal";
import EditContactModal from "../../components/ui/EditContactModal";
import ImportCSVModal from "../../components/ui/ImportCSVModal";
import LeadGenerationModal from "../../components/ui/LeadGenerationModal";
import PageHeader from "../../components/common/PageHeader";
import { useContacts } from "../../hooks/useContacts";
import { useDeleteContactWithNotification } from "../../hooks/useServicesWithNotification";

const ContactList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const location = useLocation();

  const {
    data: contactsResponse,
    isLoading,
    error,
    isFetching,
  } = useContacts(currentPage, itemsPerPage);

  const { mutate: deleteContact } = useDeleteContactWithNotification();

  useEffect(() => {
    if (isLoading) {
      console.log(
        ` Fetching contacts: page ${currentPage}, limit ${itemsPerPage}`,
      );
    }
    if (contactsResponse) {
      console.log(`Contacts loaded:`, contactsResponse);
    }
    if (error) {
      console.error(`Error loading contacts:`, error);
    }
  }, [isLoading, contactsResponse, error, currentPage, itemsPerPage]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("action") === "add-contact") {
      setIsModalOpen(true);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const columns = [
    {
      header: "First Name",
      key: "firstName",
      render: (row) => <span className="uppercase">{row.firstName}</span>,
    },
    {
      header: "Last Name",
      key: "lastName",
      render: (row) => <span className="uppercase">{row.lastName}</span>,
    },
    {
      header: "Email",
      key: "email",
      render: (row) => <span>{row.email}</span>,
    },
    {
      header: "Tags",
      key: "tags",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {Array.isArray(row.tags) && row.tags.length > 0 ? (
            row.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2.5 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-xs font-medium text-zinc-800">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
    { header: "City", key: "city", render: (row) => <span>{row.city}</span> },
    {
      header: "State",
      key: "state",
      render: (row) => <span>{row.state}</span>,
    },
    { header: "Zip", key: "zip", render: (row) => <span>{row.zip}</span> },
    {
      header: "Phone",
      key: "phoneNumbers",
      render: (row) => <span>{row.phoneNumbers}</span>,
    },
  ];

  const pagination = contactsResponse?.pagination || {};
  const contacts = contactsResponse?.data || [];

  const handleExportCSV = () => {
    const headers = columns.map((col) => col.header).join(",");

    const csvRows = contacts.map((row) => {
      return columns
        .map((col) => {
          const cellValue = String(row[col.key] || "").replace(/"/g, '""');
          return `"${cellValue}"`;
        })
        .join(",");
    });

    const csvContent = [headers, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `contacts_export_${new Date().toLocaleDateString()}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDelete = (contact) => {
    deleteContact(contact._id);
  };

  const headerActions = [
    {
      label: "Select from Lead Generation",
      onClick: () => setIsLeadModalOpen(true),
      variant: "primary",
      icon: <SquarePlus size={15} />,
      iconPlacement: "right",
    },
    {
      label: "Import CSV",
      onClick: () => setIsImportModalOpen(true),
      variant: "white",
      className: "border border-gray-100 shadow-sm rounded-lg",
      icon: <ArrowUpToLine size={15} />,
    },
    {
      label: "Add Contact",
      onClick: () => setIsModalOpen(true),
      variant: "primary",
      icon: <SquarePlus size={15} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle="List of all the contacts"
        actions={headerActions}
      />

      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contact={selectedContact}
      />
      <LeadGenerationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      <div className="p-8">
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

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-px hover:bg-gray-50 transition-colors">
            <ArrowDownToLine size={16} /> Exports CSV
          </button>
        </div>

        <GenericTable
          columns={columns}
          data={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isLoading && contacts.length === 0 && (
          <div className="flex items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader className="animate-spin text-primary" size={32} />
              <p className="text-gray-600">Loading contacts...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <p className="font-semibold">Error loading contacts</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        <div className="p-4 border-t border-[#EEEEF0] flex justify-between items-center bg-white">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="text-sm text-gray-500 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages} | Total:{" "}
            {pagination.totalItems} contacts
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= (pagination.totalPages || 1) || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-[8px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
