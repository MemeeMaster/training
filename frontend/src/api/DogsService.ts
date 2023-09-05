import { apiClient } from "@api/ApiClient";
import { DogPage, DogFilter } from "@interfaces/Api";
import { dogsPaths } from "@api/ApiPaths";

const { listPath, pdfPath } = dogsPaths;

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
