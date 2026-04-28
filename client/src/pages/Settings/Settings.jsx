import React, { useState, useRef } from "react";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const profileRef = useRef();
  const securityRef = useRef();

  return (
    <div>
      <div className="px-8 pt-6 border-b border-gray-100  bg-white">
        <nav className="flex gap-8">
          {["Profile", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-all relative ${
                activeTab === tab
                  ? "text-yellow-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}>
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400" />
              )}
            </button>
          ))}
        </nav>
        <div className="py-4 border-b border-gray-100 flex justify-between items-end ">
          <div className="">
            <h2 className="text-lg font-bold text-[#2E2E36]">{activeTab}</h2>
            <p className="text-sm text-gray-500">
              Update your {activeTab.toLowerCase()} and personal details here.
            </p>
          </div>

          <div className="flex gap-3 pb-3">
            <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => {
                if (activeTab === "Profile" && profileRef.current) {
                  profileRef.current.handleSave();
                } else if (activeTab === "Security" && securityRef.current) {
                  securityRef.current.handleSave();
                }
              }}
              className="px-6 py-2 bg-yellow-400 rounded-lg text-sm font-bold text-gray-900 hover:bg-yellow-500 shadow-sm transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      <main className="p-6 h-[calc(100vh-200px)] overflow-y-auto">
        {activeTab === "Profile" ? (
          <ProfileTab ref={profileRef} />
        ) : (
          <SecurityTab ref={securityRef} />
        )}
      </main>
    </div>
  );
};

export default Settings;
