"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { BorderDottedIcon } from "@radix-ui/react-icons";
import { Button, Menu, MenuItem } from "@mui/material";

type Props = {
  columns: GridColDef[];
  rows: any[];
  form?: string;
};

export default function DataGridDemo({ columns, rows, form }: Props) {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 150,
    editable: false,
    sortable: false,
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleView = () => {
        console.log("Copy order ID", params.row.id);
        handleClose();
      };
      const handleAdd = () => {
        console.log("Copy order ID", params.row.id);
        handleClose();
      };

      return (
        <div className="flex h-full justify-center items-center">
          <Button variant="outlined" size="small" onClick={handleClick}>
            <BorderDottedIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleView}>View Row</MenuItem>
            {/* adding a param so i can know what form should i open */}
            <MenuItem onClick={handleAdd}>Add Row</MenuItem>
          </Menu>
        </div>
      );
    },
  };
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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
