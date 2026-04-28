import { createContext, useContext, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Button from "../components/common/Button";
import { AlertCircle } from "lucide-react";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState({
    open: false,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    onConfirm: null,
    isLoading: false,
  });

  const showConfirmation = useCallback((config) => {
    setConfirmation((prev) => ({
      ...prev,
      open: true,
      title: config.title || "Confirm Action",
      message: config.message || "Are you sure?",
      onConfirm: config.onConfirm || null,
    }));
  }, []);

  const closeConfirmation = () => {
    setConfirmation((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleConfirm = async () => {
    setConfirmation((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      if (confirmation.onConfirm) {
        await confirmation.onConfirm();
      }
      closeConfirmation();
    } finally {
      setConfirmation((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return (
    <ConfirmationContext.Provider
      value={{ showConfirmation, closeConfirmation }}>
      {children}
      <Dialog
        open={confirmation.open}
        onClose={closeConfirmation}
        maxWidth="sm"
        fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AlertCircle size={24} color="#fbbf24" />
          {confirmation.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmation.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation} disabled={confirmation.isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={confirmation.isLoading}>
            {confirmation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context;
};
