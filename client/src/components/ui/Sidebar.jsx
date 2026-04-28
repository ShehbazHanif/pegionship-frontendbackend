import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { NAV_LINKS } from "../../utils/navLinks";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`h-screen bg-white border-r border-zinc-100 fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[240px]"
      }`}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-100 bg-white overflow-hidden">
        {!isCollapsed && (
          <div className="flex items-center gap-2 transition-opacity duration-200">
            <img
              src="/src/assets/Row.svg"
              alt="Logo"
              className="h-8 min-w-[32px]"
            />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1 rounded-md hover:bg-zinc-50 transition-transform duration-300 w-6 h-6 ${
            isCollapsed ? "mx-auto rotate-180" : ""
          }`}>
          <img
            src="/src/assets/tabler_layout-sidebar-left-collapse.svg"
            alt="Toggle Sidebar"
            className="h-8"
          />
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        {NAV_LINKS.filter((item) => item.name !== null).map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <React.Fragment key={item.path}>
              {item.section && !isCollapsed && (
                <div className="flex items-center mt-6 mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 whitespace-nowrap">
                    {item.section}
                  </span>
                  <div className="flex-grow h-[1px] bg-zinc-100 ml-2" />
                </div>
              )}

              <Tooltip
                title={isCollapsed ? item.name : ""}
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: "0.875rem",
                      padding: "8px",
                      backgroundColor: "#1f2937",
                    },
                  },
                }}>
                <Link
                  to={item.path}
                  className={`relative group flex items-center rounded transition-all h-11 ${
                    isCollapsed ? "justify-center" : "px-4 gap-3"
                  } ${
                    isActive
                      ? "bg-yellow-50 text-zinc-800"
                      : "text-gray-500 hover:bg-yellow-50"
                  }`}>
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`w-[18px] h-[18px] object-contain ${
                        isActive ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  )}

                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </Tooltip>
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
