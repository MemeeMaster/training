import { apiClient } from "@api/ApiClient";
import { DogPage } from "@interfaces/Api";
import { dogsPaths } from "@api/ApiPaths";

const { listPath, pdfPath } = dogsPaths;

export const executeDogList = async (page: number): Promise<DogPage> => {
  const path = `${listPath}/${page}`;
  return await apiClient.get(path).then((res) => res.data);
};

export const executePdfDownload = async (dogName: string, id: number) => {
  const path = `${pdfPath}/${id}/pdf`;
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
