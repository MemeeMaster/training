import { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import useData from "@hooks/useData";
import { ROOT_PATH } from "@config/routes";
import { Button, IconButton, Paper, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * SearchBlock component for filtering and searching dog data.
 *
 * The SearchBlock component provides a user interface for filtering and searching
 * dog data based on user input. It includes an input field for entering search
 * criteria and a "Back" button to navigate back to a previous page.
 *
 * @component
 */
const SearchBlock = () => {
  const { filters, handleFilterChange, handleFiltersReset, fetchDogsData } =
    useData();
  const navigate = useNavigate();

  const handleEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      fetchDogsData({ page: 1, filter: filters });
      handleFiltersReset();
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Button variant="outlined" onClick={() => navigate(ROOT_PATH)}>
        Back
      </Button>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mx: 1,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          value={filters.searchBarData}
          onChange={(e) => {
            handleFilterChange("searchBarData", e);
          }}
          onKeyDown={handleEnterKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => fetchDogsData({ page: 1, filter: filters })}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBlock;
