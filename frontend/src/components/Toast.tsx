import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useToast from "@hooks/useToast";

/**
 * Provides toast interface containing message and close button.
 * 
 * @returns The Toast component
 */
const Toast = () => {
  const { showToast, message, handleToastClosing } = useToast();

  return createPortal(
    <div className={`toast ${showToast ? "active" : ""}`}>
      <div className="toastTitle">
        <p>Information</p>
        <FontAwesomeIcon icon={faXmark} onClick={handleToastClosing} />
      </div>
      <div className="toastContent">
        <p>{message}</p>
      </div>
    </div>,
    document.getElementById("toast")!
  );
};

export default Toast;
