import { ReactNode } from "react";
import StarsSection from "@style/ShootingStars.style";

const ShootingStars = ({ children }: { children: ReactNode }) => {
  return (
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
  );
};

export default ShootingStars;
