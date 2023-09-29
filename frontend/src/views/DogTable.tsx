import TableComponent from "@components/TableComponent";
import SearchBlock from "@components/SearchBlock";
import FilterBlock from "@components/FilterBlock";
import { Box, Container } from "@mui/material";

/**
 * Component for table containing dog details and list tools.
 *
 * This component provides wrapper structure for data table and tool
 * components.
 *
 * @component
 * @returns The DogTable component.
 */
const DogTable = () => {
  return (
    <Container sx={{ position: "relative", top: 70 }}>
      <Box sx={{ my: 2 }}>
        <SearchBlock />
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TableComponent />
        <FilterBlock />
      </Box>
    </Container>
  );
};

export default DogTable;
