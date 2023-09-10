import { useState, useEffect } from "react";
import { executeOptionsFetch } from "@api/DogsService";
import { DogOptions } from "@interfaces/Api";
import useToast from "@hooks/useToast";
import useData from "@hooks/useData";

/**
 * Defines the initial state for search block options.
 *
 * @constant
 */
const initialState: DogOptions = {
  breeds: [],
  colors: [],
};

/**
 * Provides set of components designed to set filters.
 * 
 * @component
 * @returns The FilterBlock component
 */
const FilterBlock = () => {
  const [options, setOptions] = useState<DogOptions>(initialState);
  const { handleToastOpening } = useToast();
  const { filters, handleFilterChange, handleFiltersReset, fetchDogsData } = useData();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await executeOptionsFetch();
        setOptions(fetchedOptions);
      } catch (e) {
        handleToastOpening("Could not fetch options.");
      }
    };

    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Resets filters
   * 
   * @constant
   */
  const resetFilters = () => {
    handleFiltersReset();
    fetchDogsData({page: 1});
  }

  return (
    <div className="filterWrapper">
      <select className="filterInput" value={filters.breed} onChange={(e) => {
        handleFilterChange("breed", e)}}>
        <option value="">Breed</option>
        {options.breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <select className="filterInput" value={filters.color} onChange={(e) => {
        handleFilterChange("color", e)}}>
        <option value="">Color</option>
        {options.colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <select className="filterInput" value={filters.gender} onChange={(e) => {
        handleFilterChange("gender", e)}}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" className="filterInput" value={`${filters.age}`} placeholder="Age" min="1" onChange={(e) => {
        handleFilterChange("age", e)}}/>
      <button className="filterInput" onClick={() => fetchDogsData({page: 1, filter: filters})}>Search</button>
      <button className="filterInput" onClick={resetFilters}>Reset filters</button>
    </div>
  );
};

export default FilterBlock;
