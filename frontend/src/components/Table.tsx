import { useState, useEffect } from "react";
import { executePdfDownload } from "@api/DogsService";
import { DogSortConfig } from "@interfaces/Api";
import useAuth from "@hooks/useAuth";
import useData from "@hooks/useData";

const initialConfig: DogSortConfig = {
  key: null,
  direction: "none",
};

/**
 * Table component for displaying and sorting dog data.
 *
 * The Table component displays a table of dog data, allowing users to sort the
 * data by various columns (e.g., name, breed, age). It also includes a "Download"
 * button to download a PDF report for each dog.
 *
 * @component
 */
const Table = () => {
  const [sortConfig, setSortConfig] = useState<DogSortConfig>(initialConfig);
  const { authenticate } = useAuth();
  const {
    filters,
    isDataFetched,
    fetchDogsData,
    dogData,
    paginationButtons,
    handleFetchStatus,
  } = useData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleFetchStatus(false), []);

  useEffect(() => {
    if (!isDataFetched) fetchDogsData({page: 1});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched, authenticate]);

  const formatAge = (age: number) => {
    if (age === 1) return `${age} year`;
    return `${age} years`;
  };

  /**
   * Changes direction of sorting table. It fetches data based on props sent
   * to {@code fetchDogsData}. 
   * Direction is changed based on previous direction state.
   * "ASC" -> "DESC" -> "NONE" -> "ASC" -> ...
   * 
   * @param key - field by which table is sorted
   */
  const handleHeaderClick = (key: string) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "asc"
          ? "desc"
          : sortConfig.direction === "desc"
          ? "none"
          : "asc";
    }

    setSortConfig({ key, direction });
    fetchDogsData({
      page: 1,
      field: key,
      direction: direction,
      filter: filters,
    });
  };

  return (
    <>
      {isDataFetched && dogData ? (
        <div className="dogTable">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleHeaderClick("name")}>Name</th>
                <th onClick={() => handleHeaderClick("breed")}>Breed</th>
                <th onClick={() => handleHeaderClick("gender")}>Gender</th>
                <th onClick={() => handleHeaderClick("age")}>Age</th>
                <th onClick={() => handleHeaderClick("color")}>Color</th>
                <th onClick={() => handleHeaderClick("collarColor")}>
                  Collar color
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dogData.content.map((el) => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.breed}</td>
                  <td>{el.gender}</td>
                  <td>{formatAge(el.age)}</td>
                  <td>{el.color}</td>
                  <td>{el.collarColor}</td>
                  <td>
                    <button
                      className="downloadButton"
                      onClick={() => executePdfDownload(el.name, el.id)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginationButtons.map((el) => el)}
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
};

export default Table;
