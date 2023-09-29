import { useNavigate } from "react-router-dom";
import useData from "@hooks/useData";
import { ROOT_PATH } from "@config/routes";

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
  const { filters, handleFilterChange } = useData();
  const navigate = useNavigate();

  return (
    <div className="searchBlock">
      <button className="button" onClick={() => navigate(ROOT_PATH)}>
        Back
      </button>
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        value={filters.searchBarData}
        onChange={(e) => {
          handleFilterChange("searchBarData", e);
        }}
      />
    </div>
  );
};

export default SearchBlock;
