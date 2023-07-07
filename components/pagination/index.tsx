import React from "react";
import {Button , ButtonGroup} from "@mui/material"
//component to render pagination
const Pagination: React.FC<{ totalPages: number; currentPage: number; onPageChange: (pageNumber: number) => void }> = ({
    totalPages,
    currentPage,
    onPageChange,
  }) => {
    //creating array of page numbers from 1 to totalPages
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); 
    
    return (
      <div style={{marginTop:10 , marginBottom:20}}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {pageNumbers.map((pageNumber) => (
          <Button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </Button>
        ))}
        </ButtonGroup>
      </div>
    );
  };

export default Pagination