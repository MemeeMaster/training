import { RequestData, DogPage, DogFilter, DogSortDTO, DogFilterEvent } from "./Api";
import { AlertColor } from "@mui/material";

export interface AuthContextType {
  isLogin: boolean;
  isAuthenticated: boolean;
  loggedUser: string,
  handleLoginChange: () => void;
  handleLogin: (data: RequestData) => void;
  handleLogout: () => void;
  forceLogout: () => void;
  authenticate: () => void;
}

export interface ToastContextType {
  showToast: boolean;
  message: string;
  severity: AlertColor;
  handleToastOpening: (message: string, servity: AlertColor) => void;
  handleToastClosing: () => void;
}

export interface DataContextType {
  dogData: DogPage | undefined;
  isDataFetched: boolean;
  filters: DogFilter;
  handleFilterChange: (
    field: keyof DogFilter,
    e: DogFilterEvent
  ) => void;
  handleFiltersReset: () => void;
  fetchDogsData: (data: DogSortDTO) => void;
  handleFetchStatus: (isFetched: boolean) => void;
}
