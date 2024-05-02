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
import { set } from "react-hook-form";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
type Props = {
  columns: GridColDef[];
  rows: any[];
  form?: string;
};

export default function DataGridDemo({ columns, rows, form }: Props) {
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isViewFormVisible, setIsViewFormVisible] = React.useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);

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

  const handleEdit = () => {
    console.log("Editing row ID", selectedRowId);
    setIsEditFormVisible(true);
    handleClose();
  };

  const handleView = () => {
    console.log("Viewing row ID", selectedRowId);
    setIsViewFormVisible(true);
    handleClose();
  };

  const handleAdd = () => {
    console.log("Adding new row");
    setIsAddFormVisible(true);
    handleClose();
  };

  const closeForm = () => {
    setIsViewFormVisible(false);
    setIsEditFormVisible(false);
    setIsAddFormVisible(false);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: "Change density" } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "outlined" },
          }}
        />
      </GridToolbarContainer>
    );
  }

  const renderViewForm = () => {
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
  const renderAddForm = () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
    switch (form) {
      case "category":
        return (
          <CategoryForm
            categories={selectedRow}
            onClose={closeForm}
            action="add"
          />
        );
      case "diningTable":
        return (
          <DiningTableForm
            diningTables={selectedRow}
            onClose={closeForm}
            action="add"
          />
        );
      case "product":
        const { product, categories } = selectedRow || {};
        return (
          <ProductForm
            product={selectedRow}
            categories={categories}
            onClose={closeForm}
            action="add"
          />
        );
      case "reservations":
        return (
          <ReservationsForm
            reservations={selectedRow}
            onClose={closeForm}
            action="add"
          />
        );
      case "staff":
        return (
          <StaffForm
            staffUsers={selectedRow}
            onClose={closeForm}
            action="add"
          />
        );
      default:
        return null;
    }
  };
  const renderEditForm = () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
    switch (form) {
      case "category":
        return (
          <CategoryForm
            categories={selectedRow}
            onClose={closeForm}
            action="edit"
          />
        );
      case "diningTable":
        return (
          <DiningTableForm
            diningTables={selectedRow}
            onClose={closeForm}
            action="edit"
          />
        );
      case "product":
        const { product, categories } = selectedRow || {};
        return (
          <ProductForm
            product={selectedRow}
            categories={categories}
            onClose={closeForm}
            action="edit"
          />
        );
      case "reservations":
        return (
          <ReservationsForm
            reservations={selectedRow}
            onClose={closeForm}
            action="edit"
          />
        );
      case "staff":
        return (
          <StaffForm
            staffUsers={selectedRow}
            onClose={closeForm}
            action="edit"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          rows={rows}
          columns={[
            ...columns,
            {
              field: "action",
              headerName: "Action",
              width: 150,
              editable: false,
              sortable: false,
              headerAlign: "center",
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
          // slots={{ toolbar: GridToolbar }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true,
          //     quickFilterProps: { debounceMs: 500 },
          //   },
          // }}
          slots={{
            toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit Row</MenuItem>
          <MenuItem onClick={handleView}>View Row</MenuItem>
        </Menu>
        {isViewFormVisible && renderViewForm()}
        {isEditFormVisible && renderEditForm()}
        {isAddFormVisible && renderAddForm()}
      </Box>
      <Button variant="contained" onClick={handleAdd}>
        Add New Row
      </Button>
    </Box>
  );
}
