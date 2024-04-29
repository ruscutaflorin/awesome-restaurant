import { Reservation } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type TableProps = {
  reservations: Reservation[];
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "tableId",
    headerName: "Table ID",
    width: 150,
    editable: false,
  },
  {
    field: "reservationDate",
    headerName: "Reservation Date",
    sortable: true,
    width: 160,
  },
  {
    field: "numberOfGuests",
    headerName: "Number of Guests",
    sortable: true,
    width: 160,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    sortable: true,
    width: 160,
  },
  {
    field: "customerPhone",
    headerName: "Customer Phone",
    sortable: true,
    width: 160,
  },
  {
    field: "customerEmail",
    headerName: "Customer Email",
    sortable: true,
    width: 160,
  },
  {
    field: "reservationStatus",
    headerName: "Status",
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

const DisplayReservations: React.FC<TableProps> = ({
  reservations,
}: TableProps) => {
  return (
    <div>
      <DataGridDemo columns={columns} rows={reservations} form="reservations" />
    </div>
  );
};

export default DisplayReservations;
