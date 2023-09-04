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
  age: number;
  color: string;
  collarColor: string;
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
