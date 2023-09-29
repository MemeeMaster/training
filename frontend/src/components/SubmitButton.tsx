import { Button } from "@mui/material";

const SubmitButton = ({ content }: { content: string }) => {
  return (
    <Button
      sx={{
        marginTop: 2,
        ":hover": { color: "#fff" },
      }}
      size="large"
      type="submit"
      variant="contained"
      className="button"
      fullWidth
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
