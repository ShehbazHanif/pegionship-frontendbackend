import React from "react";
import { Tooltip, IconButton, Avatar } from "@mui/material"; 
import { HelpOutlineOutlined } from "@mui/icons-material";
import Button from "./Button";

const PageHeader = ({ 
  title, 
  subtitle, 
  tooltipText, 
  userImg, 
  showAvatar = false, 
  actions = [] 
}) => {
  
 
  const firstLetter = title ? title.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        
        
        {showAvatar && (
          <Avatar 
            src={userImg} 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: "#FACC15", 
              color: "#1D2939",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            {firstLetter}
          </Avatar>
        )}

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-[#2E2E36] font-['Lato'] text-[20px] font-bold leading-[28px]">
              {title}
            </h1>

            {tooltipText && (
              <Tooltip title={tooltipText} placement="top" arrow>
                <IconButton size="small" sx={{ p: 0, color: "#717386" }}>
                  <HelpOutlineOutlined sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>

          {subtitle && (
            <p className="text-[#717386] font-['Open_Sans'] text-[14px] font-normal leading-[20px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "primary"}
            fullWidth={action.fullWidth}
            className={`flex items-center gap-2 ${action.className || ""}`}
            onClick={action.onClick}
            startIcon={action.iconPlacement !== "right" ? action.icon : null}
            endIcon={action.iconPlacement === "right" ? action.icon : null}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;