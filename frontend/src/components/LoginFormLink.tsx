import { Link } from "@mui/material";

interface LinkProps {
  content: string;
  onClick: () => void;
}

const LoginFormLink = ({ content, onClick }: LinkProps) => {
  return (
    <Link
      sx={{
        marginTop: 2,
        ":hover": { color: "#cecece" },
      }}
      underline="none"
      component="button"
      color="secondary"
      variant="body2"
      onClick={onClick}
    >
      {content}
    </Link>
  );
};

export default LoginFormLink;
