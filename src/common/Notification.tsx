import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {
  type: AlertColor;
  open: boolean;
  message: string;
  hideToast: () => void;
};

export const Notification = ({ type, open, hideToast, message }: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    open={open}
    autoHideDuration={3000}
    onClose={hideToast}
  >
    <Alert onClose={hideToast} severity={type} style={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);
