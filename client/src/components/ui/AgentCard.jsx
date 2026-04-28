import React, { useState } from "react";
import { Mic2, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const AgentCard = ({ agent, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
    setShowMenu(false);
  };

  const handleEditClick = () => {
    navigate(`/agents/editAgentWizard/${agent._id}`);
    setShowMenu(false);
  };

  const handleOpenClick = () => {
    navigate(`/agents/editAgentWizard/${agent._id}`);
  };

  return (
    <div className="w-80 h-60 p-5 bg-white rounded-xl border border-zinc-100 flex flex-col justify-between items-start transition-all hover:border-yellow-400">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="inline-flex flex-col justify-start items-start gap-2">
            <div className="w-10 h-10 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center">
              {agent.image ? (
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[20px] text-white font-bold">
                  {agent.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="self-stretch text-zinc-800 text-xl font-semibold font-['Lato'] leading-7">
              {agent.name}
            </div>
          </div>
        </div>

        <div className="self-stretch text-gray-500 text-sm font-normal font-['Open_Sans'] leading-5">
          {agent.voiceType || agent.voice || "No voice configured"}
        </div>

        <div className="flex gap-2 mt-2">
          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold ${
              agent.status === "Active"
                ? "bg-green-100 text-green-800"
                : agent.status === "Inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}>
            {agent.status || "Draft"}
          </span>
        </div>
      </div>

      <div className="self-stretch flex flex-col justify-start items-end gap-1.5">
        <div className="justify-start">
          <span className="text-gray-500 text-xs font-medium font-['Open_Sans'] leading-5">
            Created:
          </span>
          <span className="text-gray-500 text-xs font-normal font-['Open_Sans'] leading-5">
            {" "}
            {formatDate(agent.createdAt)}
          </span>
        </div>

        <div className="self-stretch inline-flex justify-start items-center gap-3 relative">
          <div
            className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-200"
            onClick={() => setShowMenu(!showMenu)}>
            <MoreHorizontal size={20} className="text-zinc-800" />
          </div>

          {showMenu && (
            <div className=" mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-gray-700">
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-100 text-red-600 border-t">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}

          <div className="flex-1">
            <button
              onClick={handleOpenClick}
              className="w-full h-10 px-4 py-2.5 bg-yellow-400 rounded-lg shadow-sm flex justify-center items-center gap-2 overflow-hidden hover:bg-yellow-500 transition-colors">
              <span className="text-zinc-800 text-sm font-semibold font-['Open_Sans'] leading-5">
                Open
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
