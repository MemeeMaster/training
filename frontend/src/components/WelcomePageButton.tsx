import { Button } from "@mui/material";
import { StyledButtonProps } from "@interfaces/Api";

const WelcomePageButton = ({ content, onClick }: StyledButtonProps) => {
  return (
    <Button sx={{ fontSize: "1.2rem" }} variant="outlined" onClick={onClick}>
      {content}
    </Button>
  );
};

export default WelcomePageButton;
