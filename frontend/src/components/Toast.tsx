import { createPortal } from "react-dom";
import useToast from "@hooks/useToast";
import { Snackbar, Alert } from "@mui/material";

/**
 * Provides toast interface containing message and close button.
 *
 * @returns The Toast component
 */
const Toast = () => {
  const { showToast, message, handleToastClosing, severity } = useToast();

  return createPortal(
    <Snackbar
      open={showToast}
      onClose={handleToastClosing}
      autoHideDuration={6000}
    >
      <Alert
        severity={severity}
        onClose={handleToastClosing}
      >
        {message}
      </Alert>
    </Snackbar>,
    document.getElementById("toast")!
  );
};

export default Toast;
