import React from "react";

const SummaryCard = ({ label, value }) => (
  <div className="bg-white w-[200px] py-4 px-6 rounded-[12px] border border-[#EEEEF0] flex flex-col gap-2  shadow-sm">
    <span className="text-[16px] font-medium font-['Open_Sans'] text-gray-400">{label}</span>
    <h2 className="text-[30px] font-bold font-['Lato'] text-secondary">{value}</h2>
  </div>
);

export default SummaryCard;
