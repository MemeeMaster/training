import { DogFilter, DogPage } from "@interfaces/Api";
import { DataContextType } from "@interfaces/ContextTypes";
import { createContext, ReactNode, useState } from "react";
import { executeDogList } from "@api/DogsService";
import useToast from "@hooks/useToast";

export const DataContext = createContext<DataContextType>({
  dogData: undefined,
  paginationButtons: [],
  isDataFetched: false,
  handleFiltersChange: () => {},
  fetchDogsData: () => {},
  handleFetchStatus: () => {},
});

const initialState: DogFilter = {
  breed: "",
  color: "",
  gender: "",
  age: null,
  searchBarData: "",
};

const DataProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      return response;
    } catch (e) {
      handleToastOpening("Couldn't fetch dogs data.");
    }
  };

  const handleFiltersChange = (filter: DogFilter) => {
    setFilters(filter);
  };

  const handleFetchStatus = (isFetched: boolean) => {
    setIsDataFetched(isFetched);
  };

  return (
    <DataContext.Provider
      value={{
        dogData,
        paginationButtons,
        isDataFetched,
        handleFiltersChange,
        fetchDogsData,
        handleFetchStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
