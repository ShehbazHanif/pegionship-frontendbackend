import React, { useState, useEffect } from "react";
import Modal from "../common/Model";
import Input from "../common/Input";
import { X } from "lucide-react";
import { useUpdateContactWithNotification } from "../../hooks/useServicesWithNotification";

const EditContactModal = ({ isOpen, onClose, contact }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: "",
    city: "",
    state: "",
    zip: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (contact && isOpen) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phoneNumbers: contact.phoneNumbers || "",
        city: contact.city || "",
        state: contact.state || "",
        zip: contact.zip || "",
        tags: Array.isArray(contact.tags) ? contact.tags : [],
      });
      setTagInput("");
    }
  }, [contact, isOpen]);

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
        });
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const { mutate: updateContact, isPending } = useUpdateContactWithNotification(
    {
      onSuccess: () => {
        onClose();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumbers: "",
          city: "",
          state: "",
          zip: "",
          tags: [],
        });
        setTagInput("");
      },
    },
  );

  const handleUpdate = () => {
    updateContact({ id: contact._id, data: formData });
  };

  const footerButtons = [
    { label: "Cancel", onClick: onClose, variant: "secondary" },
    {
      label: isPending ? "Updating..." : "Update Contact",
      onClick: handleUpdate,
      variant: "primary",
      disabled: isPending,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Contact"
      footerButtons={footerButtons}
      maxWidth="sm">
      <div className="space-y-4 font-['Open_Sans']">
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <Input
                label="Last name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email address"
                type="email"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <div className="flex flex-col gap-1.5">
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="+16466317762"
                  value={formData.phoneNumbers}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumbers: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="Enter"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <Input
                label="State"
                placeholder="Enter"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Zip Code"
                placeholder="Enter"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-800 text-sm font-medium leading-5">
                Tags
              </label>
              <div className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-zinc-100 text-gray-500 text-sm focus-within:border-yellow-400 shadow-sm flex flex-wrap gap-2 items-center">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                    <span className="text-sm font-medium text-zinc-800">
                      {tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="flex items-center justify-center hover:bg-yellow-100 rounded-full p-0.5 transition-colors">
                      <X size={14} className="text-zinc-600" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder={formData.tags.length === 0 ? "Add tags..." : ""}
                  className="flex-1 min-w-[100px] bg-transparent outline-none text-sm text-zinc-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditContactModal;
