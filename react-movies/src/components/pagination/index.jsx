import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MoviePagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "center", my: 4 }}>
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={handleChange} 
        color="primary" 
        size="large"
      />
    </Stack>
  );
};

export default MoviePagination;