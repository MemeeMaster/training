import Table from "@components/Table";
import SearchBlock from "@components/SearchBlock";
import FilterBlock from "@components/FilterBlock";

const DogTable = () => {
  return (
    <div className="tableSectionWrapper">
      <div className="searchWrapper">
        <SearchBlock />
      </div>
      <div className="tableWrapper">
        <Table />
        <FilterBlock />
      </div>
    </div>
  );
};

export default DogTable;
