import { apiClient } from "@api/ApiClient";
import { DogPage, DogFilter, DogOptions } from "@interfaces/Api";
import { dogsPaths } from "@api/ApiPaths";

const { listPath, pdfPath, optionsPath } = dogsPaths;

export const executeDogList = async (
  page: number,
  filter: DogFilter
): Promise<DogPage> => {
  const path = `${listPath}/${page}`;
  return await apiClient.post(path, filter).then((res) => res.data);
};

export const executePdfDownload = async (dogName: string, id: number) => {
  const path = `${pdfPath}/${id}`;
  return await apiClient
    .get(path, { responseType: "blob" })
    .then((response) => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(response.data);
      a.download = `${dogName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

export const executeOptionsFetch = async (): Promise<DogOptions> => {
  return await apiClient.get(optionsPath).then((res) => res.data);
};
