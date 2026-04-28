import React from "react";
import Button from "../../components/common/Button";

const StatCard = ({ heading, title, icon, onBtnClick }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 card-shadow flex flex-col justify-between min-h-[160px]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 flex-shrink-0  border-blue-gray-100 rounded- bg-white flex items-center justify-center text-[#717386]">
            <img src={icon} alt={heading} className="w-6 h-6 object-contain" />
          </div>
          <span className="text-lg font-semibold font-['Lato'] text-black  ">
            {heading}
          </span>
        </div>

        <div className="mt-2">
          <h3 className="text-[16px] font-normal font-['Open Sans'] text-[#717386] leading-[20px]">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex justify-start mt-4">
        <Button variant="primary" color="primary" onClick={onBtnClick}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default StatCard;
