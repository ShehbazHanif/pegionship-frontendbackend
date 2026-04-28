import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Checkbox } from "@mui/material";
import { useContacts } from "../../../hooks/useContacts";

const SelectContacts = ({ data, update }) => {
  const { data: contactsData } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = contactsData?.data || [];
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectContact = (contactId) => {
    update((prev) => {
      const isSelected = prev.selectedContacts.includes(contactId);
      return {
        ...prev,
        selectedContacts: isSelected
          ? prev.selectedContacts.filter((id) => id !== contactId)
          : [...prev.selectedContacts, contactId],
      };
    });
  };

  const handleSelectAll = (e) => {
    update((prev) => ({
      ...prev,
      selectedContacts: e.target.checked ? contacts.map((c) => c._id) : [],
    }));
  };

  return (
    <div className=" bg-white p-4 rounded-[12px] border border-gray-100 shadow-sm">
      {/* Search & Filter Bar */}
      <div className="flex justify-end gap-3 p-2 mb-4">
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="border border-[#EEEEF0]  overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-[#EEEEF0]">
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="p-4 w-12">
                <Checkbox
                  checked={
                    contacts.length > 0 &&
                    contacts.every((c) =>
                      data?.selectedContacts?.includes(c._id),
                    )
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
              <th className="p-4 text-center">First name</th>
              <th className="p-4 text-center">Last name</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEEF0]">
            {filteredContacts.map((contact) => (
              <tr
                key={contact._id}
                className="hover:bg-gray-50 text-sm text-gray-500">
                <td className="p-4">
                  <Checkbox
                    checked={
                      data?.selectedContacts?.includes(contact._id) || false
                    }
                    onChange={() => handleSelectContact(contact._id)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": {
                        color: "#FBBF24",
                      },
                    }}
                  />
                </td>
                <td className="p-4 text-center uppercase">
                  {contact.firstName}
                </td>
                <td className="p-4 text-center uppercase">
                  {contact.lastName}
                </td>
                <td className="p-4 text-center">{contact.email}</td>
                <td className="p-4 text-center">{contact.phoneNumbers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectContacts;
