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