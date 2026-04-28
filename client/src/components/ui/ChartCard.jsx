import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const ChartCard = ({ title, value, data, dataKey = "value" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  const ranges = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last Month",
  ];

  return (
    <div className="w-full min-h-[244px] p-6 bg-white rounded-xl border border-zinc-100 flex flex-col justify-between shadow-sm relative">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-[#667085] text-[16px] font-['Open_Sans'] leading-6">
            {title}
          </div>
          <div className="text-[#1D2939] text-[48px] font-['Lato'] leading-[44px]">
            {value}
          </div>
        </div>

        <div className="w-[180px] h-[100px] -mt-2 -mr-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#FACC15"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorYellow)"
              />
              <Tooltip cursor={false} content={() => null} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pt-5 border-t border-[#F2F4F7] flex justify-center items-center">
      
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
          <button className="flex items-center gap-2 group cursor-pointer py-1">
            <span className="text-[#667085] text-sm font-medium font-['Open_Sans'] group-hover:text-zinc-800 transition-colors">
              {selectedRange}
            </span>
            <ChevronDown
              size={16}
              className={`text-[#667085] group-hover:text-zinc-800 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

        
          {isOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-40 bg-white border border-zinc-100 rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {ranges.map((range) => (
                <div
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    selectedRange === range
                      ? "bg-yellow-50 text-zinc-900 font-semibold"
                      : "text-[#667085] hover:bg-zinc-50 hover:text-zinc-900"
                  }`}>
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
