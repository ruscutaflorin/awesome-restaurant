import { DiningTable } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type TableProps = {
  tables: DiningTable[];
};

const DisplayDiningTables: React.FC<TableProps> = ({ tables }: TableProps) => {
  console.log(tables, "firstTable");
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 150,
      editable: false,
      sortable: true,
    },

    {
      field: "positionX",
      headerName: "Position X",
      sortable: true,
      editable: false,
      width: 160,
    },
    {
      field: "positionY",
      headerName: "Position Y",
      sortable: true,
      editable: false,

      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Created",
      sortable: true,
      editable: false,
      width: 160,
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      sortable: true,
      editable: false,
      width: 160,
    },
  ];

  return (
    <div>
      <DataGridDemo columns={columns} rows={tables} />
    </div>
  );
};

export default DisplayDiningTables;
