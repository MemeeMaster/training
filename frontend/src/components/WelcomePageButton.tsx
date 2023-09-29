import { Button } from "@mui/material";

interface WelcomePageButtonProps {
  content: string;
  onClick: () => void;
}

const WelcomePageButton = ({ content, onClick }: WelcomePageButtonProps) => {
  return (
    <Button sx={{ fontSize: "1.2rem" }} variant="outlined" onClick={onClick}>
      {content}
    </Button>
  );
};

export default WelcomePageButton;
