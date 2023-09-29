import { Typography } from "@mui/material";

const FormErrorPlaceholder = () => {
  return (
    <Typography
      sx={{
        fontSize: "0.9rem",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      placeholder
    </Typography>
  );
};

export default FormErrorPlaceholder;
