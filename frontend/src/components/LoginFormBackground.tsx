import { Box, Paper } from "@mui/material";
import backgroundImageURL from "@images/loginBackground.jpg";
import { ReactNode } from "react";

const LoginFormBackground = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundPosition: "center",
        WebkitBackgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000b0",
        }}
      >
        <Paper
          elevation={6}
          variant="outlined"
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginFormBackground;
