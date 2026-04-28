import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { X } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";

const LeadGenerationModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="lead-generation-modal"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(46, 46, 54, 0.30)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 720,
          height: 450,
          bgcolor: "transparent",
          borderRadius: "16px",
          boxShadow: 24,
          overflow: "hidden",
          outline: "none",
        }}
      >
        
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <img
            src="/src/assets/map.png"
            alt="Map Background"
            className="w-full h-full object-cover"
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.2)",
            }}
          />
        </Box>

        
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            p: 4,
            height: "100%",
          }}
        >
       
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "white",
              width: 32,
              height: 32,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
            size="small"
          >
            <X size={18} />
          </IconButton>

       
          <h2 className="text-white text-[22px] font-bold font-['Open_Sans'] drop-shadow-md mb-6">
            Select from Lead Generation
          </h2>

          <div className="flex flex-col gap-4 w-full max-w-[600px]">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Select Location"
                labelClassName="text-white font-semibold text-[13px] drop-shadow-sm"
                type="text"
                placeholder="Your location"
                
              />

              <Input
                label="Select Industry"
                labelClassName="text-white font-semibold text-[13px] drop-shadow-sm"
                type="text"
                placeholder="Type or select an industry"
            
              />
            </div>

            <div className="mt-2">
              <Button
                variant="primary"
                className="bg-[#FFD600] hover:bg-[#ffcf00] text-black px-6 py-2 font-semibold rounded-[6px] text-[14px] shadow"
                onClick={() => console.log("Searching...")}
              >
                Search
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default LeadGenerationModal;
