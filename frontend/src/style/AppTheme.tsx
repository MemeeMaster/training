import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[400],
    },
    secondary: {
      main: blue[100],
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "3.1rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.9rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          overflow: "hidden",
        },
      },
    },
  },
});

const AppTheme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
