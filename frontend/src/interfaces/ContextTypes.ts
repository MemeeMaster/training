import { ChangeEvent } from "react";
import { RequestData, DogPage, DogFilter, DogSortDTO } from "./Api";

export interface AuthContextType {
  isLogin: boolean;
  isAuthenticated: boolean;
  handleLoginChange: () => void;
  handleLogin: (data: RequestData) => void;
  handleLogout: () => void;
  forceLogout: () => void;
  authenticate: () => void;
}

export interface ToastContextType {
  showToast: boolean;
  message: string;
  handleToastOpening: (message: string) => void;
  handleToastClosing: () => void;
}

export interface DataContextType {
  dogData: DogPage | undefined;
  paginationButtons: JSX.Element[];
  isDataFetched: boolean;
  filters: DogFilter;
  handleFilterChange: (
    field: keyof DogFilter,
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  handleFiltersReset: () => void,
  fetchDogsData: (data: DogSortDTO) => void;
  handleFetchStatus: (isFetched: boolean) => void;
}
