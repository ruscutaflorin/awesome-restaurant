import { StaffUserDetailed } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type StaffProps = {
  staff: StaffUserDetailed[];
};

const DisplayStaff = ({ staff }: StaffProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: true,
      width: 160,
    },
    {
      field: "userId",
      headerName: "User ID",
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
      <DataGridDemo columns={columns} rows={staff} form="staff" />
    </div>
  );
};

export default DisplayStaff;
