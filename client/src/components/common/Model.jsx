import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footerButtons, 
  maxWidth = "sm" 
}) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: { borderRadius: "16px", padding: "8px" }
      }}
    >
     
      <DialogTitle className="flex items-center justify-between border-b border-gray-100 pb-4">
        <span className="text-xl font-bold text-[#2E2E36] font-['Lato']">
          {title}
        </span>
        <IconButton onClick={onClose} size="small" className="text-gray-400">
          <X size={20} />
        </IconButton>
      </DialogTitle>

     
      <DialogContent className="mt-4 overflow-y-auto">
        {children}
      </DialogContent>

     
      <DialogActions className="border-t border-gray-100 p-4 flex justify-end gap-3">
        {footerButtons && footerButtons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              btn.variant === "primary"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            } ${btn.className || ""}`}
          >
            {btn.label}
          </button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;