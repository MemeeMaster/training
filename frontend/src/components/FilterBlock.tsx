import { useState, useEffect } from "react";
import { executeOptionsFetch } from "@api/DogsService";
import { DogOptions } from "@interfaces/Api";
import useToast from "@hooks/useToast";
import useData from "@hooks/useData";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
} from "@mui/material";

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
  const { filters, handleFilterChange, handleFiltersReset, fetchDogsData } =
    useData();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await executeOptionsFetch();
        setOptions(fetchedOptions);
      } catch (e) {
        handleToastOpening("Could not fetch options.", "error");
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
    fetchDogsData({ page: 1 });
  };

  return (
    <Box sx={{ mx: 3, display: "flex", flexDirection: "column"}}>
      <FormControl fullWidth sx={{ marginBottom: 1 }}>
        <InputLabel>Breed</InputLabel>
        <Select
          value={filters.breed}
          label="Breed"
          onChange={(e) => {
            handleFilterChange("breed", e);
          }}
        >
          {options.breeds.map((breed) => (
            <MenuItem key={breed} value={breed}>
              {breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 1 }}>
        <InputLabel>Color</InputLabel>
        <Select
          value={filters.color}
          label="Color"
          onChange={(e) => {
            handleFilterChange("color", e);
          }}
        >
          {options.colors.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 1 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={filters.gender}
          label="Gender"
          onChange={(e) => {
            handleFilterChange("gender", e);
          }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={{ marginBottom: 1 }}
        type="number"
        value={`${filters.age}`}
        placeholder="Age"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={(e) => {
          handleFilterChange("age", e);
        }}
      />
      <Button
        sx={{ marginBottom: 1 }}
        variant="outlined"
        onClick={() => fetchDogsData({ page: 1, filter: filters })}
      >
        Search
      </Button>
      <Button
        sx={{ marginBottom: 1 }}
        variant="outlined"
        onClick={resetFilters}
      >
        Reset filters
      </Button>
    </Box>
  );
};

export default FilterBlock;
