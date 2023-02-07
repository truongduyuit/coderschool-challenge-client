import { AlertColor } from "@mui/material/Alert";
import React, { createContext, useContext, useState } from "react";
import { ErrorMessages } from "../configs";

type Props = {
  children: React.ReactNode;
};

type ShowToastProps = {
  message?: string;
  alertType: AlertColor;
};

type ToastContextProps = {
  open: boolean;
  message: string;
  alertType: AlertColor;
  showToast: (prop: ShowToastProps) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextProps>({
  open: false,
  message: "",
  alertType: "success",
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const showToast = ({ message, alertType }: ShowToastProps) => {
    setMessage(message || ErrorMessages.INTERNAL_SERVER_ERROR);
    setAlertType(alertType);
    setOpen(true);
  };

  const hideToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider
      value={{ open, message, alertType, hideToast, showToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
