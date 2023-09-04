import Table from "@components/Table";
import SearchBlock from "@components/SearchBlock";
import FilterBlock from "@components/FilterBlock";

const DogTable = () => {

  return (
    <div className="tableSectionWrapper">
      <div className="searchWrapper"> {/*100%*/}
          <SearchBlock />
      </div>
      <div className="tableWrapper">
        <Table /> {/*85%*/}
        <FilterBlock />
      </div>
    </div>
  );
};

export default DogTable;


{/* <div>
<button className="button" onClick={() => navigate("/logged")}>
  Back
</button>
<div>
  <Table />
</div>
</div> */}