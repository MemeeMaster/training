import { useNavigate } from "react-router-dom";

const SearchBlock = () => {
  const navigate = useNavigate();

  return (
    <div className="searchBlock">
      <button className="button" onClick={() => navigate("/logged")}>
        Back
      </button>
      <input type="text" placeholder="Search" className="searchInput" />
    </div>
  );
};

export default SearchBlock;
