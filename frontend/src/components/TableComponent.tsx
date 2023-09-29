import { useState, useEffect, ChangeEvent } from "react";
import { executePdfDownload } from "@api/DogsService";
import { DogSortConfig } from "@interfaces/Api";
import useAuth from "@hooks/useAuth";
import useData from "@hooks/useData";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Pagination,
  Skeleton,
} from "@mui/material";
import StyledTableHead from "./StyledTableHead";
import blue from "@mui/material/colors/blue";

const initialConfig: DogSortConfig = {
  key: "none",
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
const TableComponent = () => {
  const [sortConfig, setSortConfig] = useState<DogSortConfig>(initialConfig);
  const [page, setPage] = useState(1);
  const { authenticate } = useAuth();
  const { filters, isDataFetched, fetchDogsData, dogData, handleFetchStatus } =
    useData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleFetchStatus(false), []);

  useEffect(() => {
    if (!isDataFetched) fetchDogsData({ page: 1 });

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

  /**
   * Changes page of table. It fetches data based on page sent
   * to {@code fetchDogsData}.
   * Page changes with current filters.
   *
   * @param _e - event sent by user,
   * @param page - requested page
   */
  const changePage = (_e: ChangeEvent<unknown>, page: number) => {
    fetchDogsData({
      page: page,
      field: sortConfig.key,
      direction: sortConfig.direction,
      filter: filters,
    });
    setPage(page);
  };

  return (
    <>
      {isDataFetched && dogData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHead
                  onClick={() => handleHeaderClick("name")}
                  content="Name"
                />
                <StyledTableHead
                  onClick={() => handleHeaderClick("breed")}
                  content="Breed"
                />
                <StyledTableHead
                  onClick={() => handleHeaderClick("gender")}
                  content="Gender"
                />
                <StyledTableHead
                  onClick={() => handleHeaderClick("age")}
                  content="Age"
                />
                <StyledTableHead
                  onClick={() => handleHeaderClick("color")}
                  content="Color"
                />
                <StyledTableHead
                  onClick={() => handleHeaderClick("collarColor")}
                  content="Collar color"
                />
                <TableCell sx={{ bgcolor: blue[400] }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dogData.content.map((el) => (
                <TableRow key={el.id}>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.breed}</TableCell>
                  <TableCell>{el.gender}</TableCell>
                  <TableCell>{formatAge(el.age)}</TableCell>
                  <TableCell>{el.color}</TableCell>
                  <TableCell>{el.collarColor}</TableCell>
                  <TableCell>
                    <Button onClick={() => executePdfDownload(el.name, el.id)}>
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            sx={{ py: 2 }}
            count={dogData.totalPages}
            page={page}
            onChange={changePage}
          />
        </TableContainer>
      ) : (
        <Skeleton width="100%" height={700} variant="rectangular" />
      )}
    </>
  );
};

export default TableComponent;
