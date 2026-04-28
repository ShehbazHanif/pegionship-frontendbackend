import React from "react";

const Launch = ({ data }) => {
  const totalContacts = data?.selectedContacts?.length || 0;
  const estimatedTime = Math.ceil(totalContacts / 10) + " mins"; // 10 contacts per minute estimate

  return (
    <div className="p-12 flex flex-col items-center text-center space-y-8 bg-white rounded-lg">
      <div className="relative w-80 h-64 flex items-center justify-center">
        <img
          src="/src/assets/OBJETCS.svg"
          alt="Launch"
          className="object-contain "
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">
          You are about to start a Campaign
        </h2>
        <p className="text-gray-600">{data?.name}</p>
      </div>

      <div className="flex gap-12 p-8 rounded-[16px] border border-yellow-200 bg-yellow-50/30 w-full max-w-lg">
        <div className="flex-1 text-center border-r border-yellow-100">
          <p className="text-2xl font-bold text-primary">{totalContacts}</p>
          <p className="text-xs font-medium text-gray-500 uppercase mt-1">
            Total Contacts
          </p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-primary">{estimatedTime}</p>
          <p className="text-xs font-medium text-gray-500 uppercase mt-1">
            Estimated Time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Launch;
