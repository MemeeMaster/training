import Table from "@components/Table";
import SearchBlock from "@components/SearchBlock";
import FilterBlock from "@components/FilterBlock";

/**
 * Component for table containing dog details and list tools.
 * 
 * This component provides wrapper structure for data table and tool
 * components.
 * 
 * @component
 * @returns The DogTable component. 
 */
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
