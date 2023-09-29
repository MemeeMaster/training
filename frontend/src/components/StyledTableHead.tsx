import { TableCell } from "@mui/material";
import { StyledButtonProps } from "@interfaces/Api";
import { blue } from "@mui/material/colors";

const StyledTableHead = ({ content, onClick }: StyledButtonProps) => {
  return (
    <TableCell
      sx={{
        bgcolor: blue[400],
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.2s",
        "&:hover": {
          bgcolor: blue[300],
        },
      }}
      onClick={onClick}
    >
      {content}
    </TableCell>
  );
};

export default StyledTableHead;
