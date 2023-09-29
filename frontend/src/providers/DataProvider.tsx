import {
  DogFilter,
  DogPage,
  DogSortDTO,
  DogFilterEvent,
} from "@interfaces/Api";
import { DataContextType } from "@interfaces/ContextTypes";
import { createContext, ReactNode, useState } from "react";
import { executeDogList } from "@api/DogsService";
import useToast from "@hooks/useToast";

/**
 * Initial state for dog filters.
 *
 * Defines the initial state for filtering dog data. It includes fields like
 * breed, color, gender, age, and a search bar data.
 *
 * @constant
 */
const initialState: DogFilter = {
  breed: "",
  color: "",
  gender: "",
  age: null,
  searchBarData: "",
};

/**
 * Data context for managing dog-related data and filters.
 *
 * This context provides access to dog data, pagination buttons, filter state,
 * and functions to handle filter changes and data fetching.
 */
export const DataContext = createContext<DataContextType>({
  dogData: undefined,
  isDataFetched: false,
  filters: initialState,
  handleFilterChange: () => {},
  handleFiltersReset: () => {},
  fetchDogsData: () => {},
  handleFetchStatus: () => {},
});

/**
 * Data context provider for managing dog-related data and filters.
 *
 * This component provides a context for managing dog data, filters, and related
 * functionality like fetching dog data and handling filter changes.
 *
 * @component
 * @param props.children - Child components to be wrapped by the DataProvider.
 * @returns The DataProvider component.
 */
const DataProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<DogFilter>(initialState);
  const [dogData, setDogData] = useState<DogPage>();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { handleToastOpening } = useToast();

  /**
   * Fetches dog data based on sorting and filtering criteria.
   *
   * This function fetches dog data based on sorting and filtering criteria
   * provided in the `DogSortDTO` object.
   *
   * @param sortDTO - The sorting and filtering criteria.
   * @returns A promise that resolves when data is fetched.
   */
  const fetchDogsData = async ({
    page,
    field = "none",
    direction = "none",
    filter = initialState,
  }: DogSortDTO) => {
    if (filter.age && filter.age < 1) {
      handleToastOpening("Please enter an age greater than 0.", "warning");
      return;
    }

    try {
      const response = await executeDogList({ page, field, direction, filter });

      if (response.empty) {
        handleToastOpening("No results found.", "info");
        return;
      }

      setDogData(response);
      setIsDataFetched(true);
    } catch (e) {
      handleToastOpening("Couldn't fetch dogs data.", "error");
    }
  };

  const handleFetchStatus = (isFetched: boolean) => {
    setIsDataFetched(isFetched);
  };

  /**
   * Resets filter values to their initial state.
   *
   * This function resets all filter values to their initial state.
   */
  const handleFiltersReset = () => {
    setFilters(initialState);
  };

  /**
   * Handles changes in filter values.
   *
   * This function updates the filter state based on changes in filter values.
   *
   * @param field - The field being changed.
   * @param e - The event representing the change.
   */
  const handleFilterChange = (field: keyof DogFilter, e: DogFilterEvent) => {
    const updatedState: DogFilter = { ...filters, [field]: e.target.value };
    setFilters(updatedState);
  };

  return (
    <DataContext.Provider
      value={{
        dogData,
        isDataFetched,
        filters,
        handleFilterChange,
        handleFiltersReset,
        fetchDogsData,
        handleFetchStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
