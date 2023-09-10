import { AxiosHeaders } from "axios";

export interface RequestData {
  email: string;
  password: string;
}

export interface ResponseData<T> {
  data: T;
  status: number;
  statusText: string;
  config: Record<string, unknown>;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
}

// === AUTH RESPONSES ===

export interface LoginDTO {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface TokenDTO {
  refreshToken: string | null;
}

// === DOGS RESPONSES ===

export interface Dog {
  id: number;
  name: string;
  breed: string;
  gender: string;
  age: number;
  color: string;
  collarColor: string;
}

export interface DogFilter {
  breed: string;
  color: string;
  gender: string;
  age: number | null;
  searchBarData: string;
}

export interface DogPage {
  content: Dog[];
  pageable: Record<string, unknown>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Record<string, unknown>;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface DogOptions {
  breeds: string[];
  colors: string[];
}

export interface DogSortDTO {
  page: number;
  field?: string;
  direction?: string;
  filter?: DogFilter;
}

export interface DogSortConfig {
  key: string | null;
  direction: string;
}

export interface PaginationParams {
  response: DogPage;
  filter: DogFilter;
  direction: string;
  field: string;
}
