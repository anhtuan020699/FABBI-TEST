import React, { useState, useEffect } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface CustomToastProps {
  open: boolean;
  onClose?: () => void;
  message: string;
  severity?: AlertProps["severity"];
  duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({
  open,
  onClose,
  message,
  severity,
  duration = 6000,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (event: any, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert onClose={handleClose} severity={severity || "info"}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomToast;
