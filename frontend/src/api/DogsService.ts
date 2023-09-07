/**
 * Module for handling dog-related API requests.
 *
 * This module exports functions for executing dog list retrieval, PDF download, and options fetch requests.
 *
 * @module DogsService
 */
import { apiClient } from "@api/ApiClient";
import { DogPage, DogOptions, DogSortDTO,  } from "@interfaces/Api";
import { dogsPaths } from "@api/ApiPaths";

const { pdfPath, optionsPath, sortPath } = dogsPaths;

/**
 * Executes a request to retrieve a list of dogs.
 *
 * @param params - Parameters for sorting and filtering the dog list.
 * @returns A Promise that resolves with the dog list.
 */
export const executeDogList = async ({page, field, direction, filter}: DogSortDTO): Promise<DogPage> => {
  const path = `${sortPath}/${field}/${direction}/page/${page}`;
  return await apiClient.post(path, filter).then((res) => res.data);
};

/**
 * Executes a request to download a PDF file for a specific dog.
 *
 * @param dogName - The name of the dog for which to download the PDF.
 * @param id - The ID of the dog for which to download the PDF.
 */
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

/**
 * Executes a request to fetch dog-related options.
 *
 * @returns A Promise that resolves with the available dog options.
 */
export const executeOptionsFetch = async (): Promise<DogOptions> => {
  return await apiClient.get(optionsPath).then((res) => res.data);
};


