import { Category, Product } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type CategoryProps = {
  products: Product[];
};

const DisplayProducts = ({ products }: CategoryProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: true,
      width: 160,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      width: 160,
    },
    {
      field: "basePrice",
      headerName: "Base Price",
      sortable: true,
      width: 160,
    },
    {
      field: "ingredients",
      headerName: "Ingredients",
      sortable: true,
      width: 160,
    },
    {
      field: "availability",
      headerName: "Availability",
      sortable: true,
      width: 160,
    },
    {
      field: "categoryId",
      headerName: "Category ID",
      sortable: true,
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Created",
      sortable: true,
      width: 160,
    },
  ];

  return (
    <div>
      <DataGridDemo columns={columns} rows={products} />
    </div>
  );
};

export default DisplayProducts;
