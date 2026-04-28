import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme, ownerState }) => ({
  textTransform: "none",
  borderRadius: "8px",
  fontFamily: "Open_Sans",
  fontWeight: 600,

  fontStyle: "normal",
  //padding: "10px 16px",
  boxShadow: "none",
  transition: "all 0.2s ease-in-out",
  "&:active": {
    transform: "scale(0.98)",
  },

  ...(ownerState.variant === "primary" && {
    backgroundColor: "#FACC15",
    color: "#1D2939",
    "&:hover": {
      backgroundColor: "#EAB308",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    },
  }),

  ...(ownerState.variant === "secondary" && {
    backgroundColor: "#1D2939",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0F172A",
    },
  }),

  ...(ownerState.variant === "white" && {
    backgroundColor: "#ffffff",
    color: "#344054",
    border: "1px solid #E4E4E7",
    "&:hover": {
      backgroundColor: "#F9FAFB",
      borderColor: "#D4D4D8",
    },
  }),
}));

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={
        variant === "white" || variant === "outline" ? "outlined" : "contained"
      }
      ownerState={{ variant }}
      size={size}
      fullWidth={fullWidth}
      disabled={isLoading || props.disabled}
      startIcon={
        isLoading ? <CircularProgress size={16} color="inherit" /> : startIcon
      }
      endIcon={endIcon}
      className={className}
      {...props}>
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
};

export default Button;
