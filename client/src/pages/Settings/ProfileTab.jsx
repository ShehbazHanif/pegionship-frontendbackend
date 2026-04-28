import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Input from "../../components/common/Input";
import { useGetProfile, useUpdateProfile } from "../../hooks/useProfile";

const ProfileTab = forwardRef((props, ref) => {
  const { data: profileData, isLoading } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Pre-fill form data when profile is loaded
  useEffect(() => {
    if (profileData?.data) {
      const fullName = profileData.data.name || "";
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ");

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: profileData.data.email || "",
      });
    }
  }, [profileData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return;
    }

    const updateData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    };

    updateProfile(updateData);
  };

  // Expose handleSave method to parent via ref
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className=" bg-white  rounded-lg ">
      {/* Name Section */}
      <div className="grid grid-cols-[300px_1fr] items-start border-b border-gray-35 py-6 px-8 ">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Name*
        </label>
        <div className="grid grid-cols-2 gap-4 ">
          <Input
            placeholder="Olivia"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            placeholder="Rhye"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>

      {/* Email Section */}
      <div className="grid grid-cols-[300px_1fr] items-start border-b border-gray-35 py-6 px-8">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Email Address*
        </label>
        <div>
          <Input
            placeholder="olivia@pigeonship.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
          />
        </div>
      </div>

      {/* Your photo Section */}
      <div className="grid grid-cols-[300px_1fr] items-center border-b border-gray-35 py-6 px-8">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Your photo*
        </label>
        <div className="flex items-center gap-6">
          <img
            src="/path-to-avatar.png"
            className="w-16 h-16 rounded-full object-cover"
            alt="Profile"
          />
          <div className="flex gap-4 text-sm font-semibold">
            <button className="text-yellow-500 hover:text-yellow-600">
              Update image
            </button>
            <button className="text-red-500 hover:text-red-600">
              Remove image
            </button>
          </div>
        </div>
      </div>

      {/* Phone Number Section */}
      <div className="grid grid-cols-[300px_1fr] items-start border-b border-gray-35 py-6 px-8">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Phone Numner*
        </label>
        <div>
          <Input placeholder="1234567" />
        </div>
      </div>

      {/* Live Transfer Number Section */}
      <div className="grid grid-cols-[300px_1fr] items-center border-b border-gray-35 py-6 px-8">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Live Transfer Number
        </label>
        <div className="flex gap-4 max-w-[570px]">
          <Input placeholder="123456789" />
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 whitespace-nowrap">
            <span>+</span> Add Number
          </button>
        </div>
      </div>

      {/* Voice Mail Section */}
      <div className="grid grid-cols-[300px_1fr] items-center border-b border-gray-35 py-6 px-8">
        <label className="text-[ #2E2E36] font-['Open_Sans'] text-[14px] font-medium leading-[20px]">
          Voice Mail
        </label>
        <div className="flex gap-4 max-w-[570px]">
          <div className="flex-1 relative">
            <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-50">
              <option>Current</option>
            </select>
          </div>
          <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2">
            ↑ Upload
          </button>
        </div>
      </div>
    </div>
  );
});

ProfileTab.displayName = "ProfileTab";

export default ProfileTab;
