const FilterBlock = () => {
  return (
    <div className="filterWrapper">
      <select className="filterInput">
        <option value="">Breed</option>
      </select>
      <select className="filterInput">
        <option value="">Color</option>
      </select>
      <select className="filterInput">
        <option value="">Gender</option>
        <option value="female">Male</option>
        <option value="male">Female</option>
      </select>
      <input type="number" className="filterInput" placeholder="Age" min="1" />
      <button className="filterInput">Search</button>
      <button className="filterInput">Reset filters</button>
    </div>
  );
};

export default FilterBlock;
