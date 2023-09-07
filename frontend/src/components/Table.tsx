import { useState, useEffect } from "react";
import { executePdfDownload } from "@api/DogsService";
import { DogSortConfig } from "@interfaces/Api";
import useAuth from "@hooks/useAuth";
import useData from "@hooks/useData";

const initialConfig: DogSortConfig = {
  key: null,
  direction: "none",
};

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
    // if (!isDataFetched) fetchDogsData(1);
    if (!isDataFetched) fetchDogsData({page: 1});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched, authenticate]);

  const formatAge = (age: number) => {
    if (age === 1) return `${age} year`;
    return `${age} years`;
  };

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
