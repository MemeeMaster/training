import { ChangeEvent } from "react";
import { DogFilter, DogPage } from "@interfaces/Api";
import { DataContextType } from "@interfaces/ContextTypes";
import { createContext, ReactNode, useState } from "react";
import { executeDogList } from "@api/DogsService";
import useToast from "@hooks/useToast";

const initialState: DogFilter = {
  breed: "",
  color: "",
  gender: "",
  age: null,
  searchBarData: "",
};

export const DataContext = createContext<DataContextType>({
  dogData: undefined,
  paginationButtons: [],
  isDataFetched: false,
  filters: initialState,
  handleFilterChange: () => {},
  handleFiltersReset: () => {},
  fetchDogsData: () => {},
  handleFetchStatus: () => {},
});

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<DogFilter>(initialState);
  const [dogData, setDogData] = useState<DogPage>();
  const [paginationButtons, setPaginationButtons] = useState<JSX.Element[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { handleToastOpening } = useToast();

  const fetchDogsData = async (page: number, filter = initialState) => {
    try {
      const response = await executeDogList(page, filter);
      setDogData(response);

      const newButtons = [];
      for (let i = 1; i <= response.totalPages; i++) {
        newButtons.push(
          <button
            className="pageButton"
            key={i}
            onClick={() => fetchDogsData(i, filter)}
          >
            {i}
          </button>
        );
      }

      setPaginationButtons(newButtons);
      setIsDataFetched(true);
    } catch (e) {
      handleToastOpening("Couldn't fetch dogs data.");
    }
  };

  const handleFetchStatus = (isFetched: boolean) => {
    setIsDataFetched(isFetched);
  };

  const handleFiltersReset = () => {
    setFilters(initialState);
  }

  const handleFilterChange = (
    field: keyof DogFilter,
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const updatedState: DogFilter = { ...filters, [field]: e.target.value };
    setFilters(updatedState);
  };

  return (
    <DataContext.Provider
      value={{
        dogData,
        paginationButtons,
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
