import { JSX, useEffect, useState } from "react";
import { DogPage } from "@interfaces/Api";
import { executeDogList, executePdfDownload } from "@api/DogsService";
import useAuth from "@hooks/useAuth";
import useToast from "@hooks/useToast";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [dogPage, setDogPage] = useState<DogPage>();
  const [paginationButtons, setPaginationButtons] = useState<JSX.Element[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { authenticate } = useAuth();
  const { handleToastOpening } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDataFetched) fetchDogsData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched, authenticate]);

  const fetchDogsData = async (page: number) => {
    try {
      const dogsData = await executeDogList(page);
      setDogPage(dogsData);

      const newButtons = [];
      for (let i = 1; i <= dogsData.totalPages; i++) {
        newButtons.push(
          <button
            className="pageButton"
            key={i}
            onClick={() => fetchDogsData(i)}
          >
            {i}
          </button>
        );
      }

      setPaginationButtons(newButtons);
      setIsDataFetched(true);
    } catch (e) {
      handleToastOpening("Couldn't fetch dogs data.");
    }
  };

  const formatAge = (age: number) => {
    if (age == 1) return `${age} year`;
    return `${age} years`;
  };

  return (
    <>
      {isDataFetched && dogPage ? (
        <>
          <button className="button" onClick={() => navigate("/logged")}>
            Back
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Color</th>
                <th>Collar color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dogPage.content.map((el) => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.breed}</td>
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
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
};

export default Table;
