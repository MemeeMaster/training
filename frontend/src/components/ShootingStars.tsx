import { ReactNode } from "react";
import StarsSection from "@style/ShootingStars.style";
import { Box } from "@mui/material";

const ShootingStars = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <StarsSection>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {children}
      </StarsSection>
    </Box>
  );
};

export default ShootingStars;
