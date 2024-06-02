import { ReviewDetailed, StaffUserDetailed } from "@/app/types/types";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type ReviewProps = {
  reviews: ReviewDetailed[];
};

const DisplayReviews = ({ reviews }: ReviewProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "restaurantId",
      headerName: "ID Restaurant",
      sortable: true,
      width: 160,
    },
    {
      field: "reviewText",
      headerName: "Feedback",
      width: 150,
      editable: false,
    },
    {
      field: "userId",
      headerName: "Sentiment",
      sortable: true,
      width: 160,
    },
    {
      field: "rating",
      headerName: "Rating",
      sortable: true,
      width: 160,
    },
    {
      field: "productId",
      headerName: "ID Produs",
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
      <DataGridDemo columns={columns} rows={reviews} form="orders" />
    </div>
  );
};

export default DisplayReviews;
