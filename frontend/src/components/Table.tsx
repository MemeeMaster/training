import { useEffect } from "react";
import { executePdfDownload } from "@api/DogsService";
import useAuth from "@hooks/useAuth";
import useData from "@hooks/useData";

const Table = () => {
  const { authenticate } = useAuth();
  const {
    isDataFetched,
    fetchDogsData,
    dogData,
    paginationButtons,
    handleFetchStatus,
  } = useData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleFetchStatus(false), []);

  useEffect(() => {
    if (!isDataFetched) fetchDogsData(1);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched, authenticate]);

  const formatAge = (age: number) => {
    if (age == 1) return `${age} year`;
    return `${age} years`;
  };

  return (
    <>
      {isDataFetched && dogData ? (
        <div className="dogTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Color</th>
                <th>Collar color</th>
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
