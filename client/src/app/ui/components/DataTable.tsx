import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type Props = {
  columns: GridColDef[];
  rows: any[];
};
export default function DataGridDemo({ columns, rows }: Props) {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <strong>
        <button
          onClick={() => {
            alert(`Editing row ${params.id}`);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            alert(`Deleting row ${params.id}`);
          }}
        >
          Delete
        </button>
      </strong>
    ),
  };
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 2,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        // disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
      />
    </Box>
  );
}
