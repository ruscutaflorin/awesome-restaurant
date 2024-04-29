import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { BorderDottedIcon } from "@radix-ui/react-icons";
import { Button, Menu, MenuItem } from "@mui/material";
import CategoryForm from "../adminPage/management/category/CategoryForm";
import DiningTableForm from "../adminPage/management/dinningTables/DiningTableForm";
import ProductForm from "../adminPage/management/product/ProductForm";
import ReservationsForm from "../adminPage/management/reservations/ReservationsForm";
import DetailsForm from "../adminPage/management/restaurant/DetailsForm";
import StaffForm from "../adminPage/management/restaurant/StaffForm";
import { Category } from "@/app/types/types";

type Props = {
  columns: GridColDef[];
  rows: any[];
  form?: string;
};

export default function DataGridDemo({ columns, rows, form }: Props) {
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    setSelectedRowId(rowId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    console.log("Viewing row ID", selectedRowId);
    setIsFormVisible(true);
    handleClose();
  };

  const handleAdd = () => {
    console.log("Adding row ID", selectedRowId);
    handleClose();
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const renderForm = () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
    switch (form) {
      case "category":
        return <CategoryForm categories={selectedRow} onClose={closeForm} />;
      case "diningTable":
        return (
          <DiningTableForm diningTables={selectedRow} onClose={closeForm} />
        );
      case "product":
        const { product, categories } = selectedRow || {};
        return (
          <ProductForm
            product={selectedRow}
            categories={categories}
            onClose={closeForm}
          />
        );
      case "reservations":
        return (
          <ReservationsForm reservations={selectedRow} onClose={closeForm} />
        );
      case "staff":
        return <StaffForm staffUsers={selectedRow} onClose={closeForm} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: "action",
            headerName: "Action",
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (params) => (
              <div className="flex h-full justify-center items-center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={(event) => handleClick(event, params.row.id)}
                >
                  <BorderDottedIcon />
                </Button>
              </div>
            ),
          },
        ]}
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
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView}>View Row</MenuItem>
        <MenuItem onClick={handleAdd}>Add Row</MenuItem>
      </Menu>
      {isFormVisible && renderForm()}
    </Box>
  );
}
