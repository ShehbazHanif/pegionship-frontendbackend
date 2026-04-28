import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({
      open: true,
      message,
      type,
    });
  }, []);

  const closeNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert
          onClose={closeNotification}
          severity={notification.type}
          variant="filled"
          sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
