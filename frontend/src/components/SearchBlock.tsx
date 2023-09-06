import { useNavigate } from "react-router-dom";
import useData from "@hooks/useData";

const SearchBlock = () => {
  const { filters, handleFilterChange } = useData();
  const navigate = useNavigate();

  return (
    <div className="searchBlock">
      <button className="button" onClick={() => navigate("/logged")}>
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
