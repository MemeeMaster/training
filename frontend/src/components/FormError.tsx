import { ReactNode } from "react";
import { Typography } from "@mui/material";

const FormError = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      sx={{
        color: "red",
        fontSize: "0.9rem",
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  );
};

export default FormError;
