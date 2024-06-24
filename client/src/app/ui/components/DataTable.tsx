import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridAlignment,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { BorderDottedIcon } from "@radix-ui/react-icons";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
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
import { useEffect } from "react";
import {
  deleteCategory,
  deleteDiningTable,
  deleteProduct,
  deleteReservation,
  deleteStaff,
  restaurantCategories,
} from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";

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
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const token = useAuthStore((state) => state.token);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (token && restaurantId) {
          const fetchedCategories = await restaurantCategories(
            restaurantId,
            token
          );
          setCategories(fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [restaurantId, token]);

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

  const handleEdit = (rowId: number) => {
    setSelectedRowId(rowId);
    console.log("Editing row ID", selectedRowId);
    setIsEditFormVisible(true);
    handleClose();
  };

  const handleAdd = () => {
    console.log("Adding new row");
    setIsAddFormVisible(true);
    handleClose();
  };

  const handleDelete = (rowId: number) => {
    setSelectedRowId(rowId);
    console.log("Deleting row ID", selectedRowId);
    deleteHandler();
  };

  const closeForm = () => {
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

  const deleteHandler = async () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
    if (selectedRow === undefined) return;
    console.log(selectedRow);
    switch (form) {
      case "category":
        console.log("Deleting category with id", selectedRowId);
        const resultCategory = await deleteCategory(
          restaurantId || 1,
          selectedRow.id,
          token
        );
        if (resultCategory === 200) {
          alert("Deleted successfully");
        }
        break;
      case "diningTable":
        console.log("Deleting category with id", selectedRowId);
        const resultTable = await deleteDiningTable(
          restaurantId || 1,
          selectedRow.id,
          token
        );
        if (resultTable === 200) {
          alert("Deleted successfully");
        }
        break;
      case "product":
        console.log("Deleting product with id", selectedRowId);
        const resultProduct = await deleteProduct(selectedRow.id, token);
        if (resultProduct === 200) {
          alert("Deleted successfully");
        }
        break;
      case "reservations":
        console.log("Deleting reservation with id", selectedRowId);
        const resultReservations = await deleteReservation(
          restaurantId || 1,
          selectedRow.id,
          token
        );
        if (resultReservations === 200) {
          alert("Deleted successfully");
        }
        break;
      case "staff":
        console.log("Deleting staff with id", selectedRowId);
        const resultStaff = await deleteStaff(
          restaurantId || 1,
          selectedRow.userId,
          token
        );
        if (resultStaff === 200) {
          alert("Deleted successfully");
        }
        break;
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
            reservation={selectedRow}
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
            reservation={selectedRow}
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
    <Box sx={{ width: "90vw", marginTop: "32px" }}>
      <Box sx={{ bgcolor: "white", p: 1, borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ height: "75vh", width: "100%", overflowX: "auto" }}>
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
              ...(form !== "orders"
                ? [
                    {
                      field: "action",
                      headerName: "Action",
                      width: 150,
                      editable: false,
                      sortable: false,
                      headerAlign: "center" as GridAlignment,
                      renderCell: (params: GridCellParams) => (
                        <div className="flex h-full justify-center items-center">
                          {/* <Button
                            variant="outlined"
                            size="small"
                            onClick={(event) =>
                              handleClick(event, params.row.id)
                            }
                          >
                            <BorderDottedIcon />
                          </Button> */}
                          <IconButton
                            aria-label="edit"
                            color="success"
                            onClick={() => handleEdit(params.row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ),
                    },
                  ]
                : []),
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
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
            {/* <MenuItem onClick={handleEdit}>Edit Row</MenuItem>
            <MenuItem onClick={handleView}>View Row</MenuItem> */}
          </Menu>
          {/* {isViewFormVisible && renderViewForm()} */}
          {isEditFormVisible && renderEditForm()}
          {isAddFormVisible && renderAddForm()}
        </Box>
      </Box>
      {form !== "orders" && (
        <div className="mt-5 mb-5">
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#1976d2" }}
            onClick={handleAdd}
          >
            Add New Row
          </Button>
        </div>
      )}
    </Box>
  );
}
