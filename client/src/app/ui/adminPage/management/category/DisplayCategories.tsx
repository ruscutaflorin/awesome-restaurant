import { Category } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type TableProps = {
  categories: Category[];
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "createdAt",
    headerName: "Created",
    sortable: true,
    width: 160,
  },
];

const DisplayCategories: React.FC<TableProps> = ({
  categories,
}: TableProps) => {
  return (
    <div>
      <DataGridDemo columns={columns} rows={categories} form="category" />
    </div>
  );
};

export default DisplayCategories;
