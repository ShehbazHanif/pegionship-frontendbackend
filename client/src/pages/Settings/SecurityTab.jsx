import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUpdateProfile } from "../../hooks/useProfile";

const SecurityTab = forwardRef((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      setIsEditing(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
  });

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Only save if in editing mode and all fields are filled
    if (!isEditing) return;

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    updateProfile({
      currentPassword: passwordData.currentPassword,
      password: passwordData.newPassword,
    });
  };

  // Expose handleSave method to parent via ref
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white rounded-lg py-6 px-8">
      <div className="grid grid-cols-[300px_1fr] items-start border-t border-gray-50 ">
        {/* Password Label */}
        <label className="text-sm font-bold text-gray-700 mt-2">
          Password*
        </label>

        {/* Password Content */}
        <div className="flex flex-col gap-3">
          {!isEditing ? (
            // Show "Set password" button when not editing
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 font-bold text-sm text-left hover:text-yellow-600 w-fit">
              + Change password
            </button>
          ) : (
            // Show password input fields when editing
            <div className="flex flex-col gap-3 w-full animate-in slide-in-from-top-2 duration-300 pb-4">
              {/* Current Password */}
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                  {showPasswords.current ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="New password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Confirm password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SecurityTab.displayName = "SecurityTab";

export default SecurityTab;
