import { ReactNode } from "react";
import { Paper } from "@mui/material";
import ShootingStars from "./ShootingStars";

const GlassBackground = ({ children }: { children: ReactNode }) => {
  return (
    <ShootingStars>
      <Paper
        elevation={10}
        sx={{
          py: 4,
          width: { sm: "70%", md: "50%" },
          background: "rgba(255, 255, 255, 0.23)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3.3px)",
          border: "1px solid rgba(255, 255, 255, 0.41)",
        }}
      >
        {children}
      </Paper>
    </ShootingStars>
  );
};

export default GlassBackground;
