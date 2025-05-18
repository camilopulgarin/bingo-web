import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const DynamicTable = ({ columns, data, actions, page, totalItems, pageSize, onPageChange }) => {
  return (
    <>
      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-black text-white">
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ color: "white", fontWeight: "bold" }}>
                  {col.headerName}
                </TableCell>
              ))}
              {actions?.length > 0 && (
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.renderCell ? col.renderCell(row) : row[col.field]}
                  </TableCell>
                ))}
                {actions?.length > 0 && (
                  <TableCell>
                    {actions.map((action, index) => (
                      <IconButton
                        key={index}
                        onClick={() => action.onClick(row)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {action.icon === "edit" ? <Edit /> : action.icon === "delete" ? <Delete /> : action.icon}
                      </IconButton>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1} // MUI starts at 0
        onPageChange={(event, newPage) => onPageChange(newPage + 1)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => onPageChange(1, parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
};

export default DynamicTable;
