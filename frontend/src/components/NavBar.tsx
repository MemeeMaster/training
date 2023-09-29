import useAuth from "@hooks/useAuth";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import "@style/fonts.css";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "@config/routes";

const NavBar = () => {
  const { isAuthenticated, loggedUser, forceLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar color="transparent" position="fixed" sx={{ boxShadow: "none" }}>
      <Container
        maxWidth="lg"
        sx={{
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          onClick={() => navigate(ROOT_PATH)}
          sx={{
            cursor: "pointer",
            fontFamily: "Pacifico",
            fontSize: "2rem",
            color: blue[400],
          }}
        >
          Dog Stars
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: "flex" }}>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              sx={{ fontWeight: "bold", mx: 2 }}
              onClick={forceLogout}
            >
              logout
            </Button>
            <Avatar sx={{ color: "#fff", bgcolor: blue[400] }}>
              {loggedUser.toUpperCase()[0]}
            </Avatar>
          </Box>
        ) : null}
      </Container>
    </AppBar>
  );
};

export default NavBar;
