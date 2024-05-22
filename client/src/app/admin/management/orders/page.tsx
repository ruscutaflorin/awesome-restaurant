"use client";
import OrderTable from "@/app/ui/adminPage/management/orders/orders";
import React, { useEffect, useState } from "react";
import { Order } from "@/app/types/types";
import { restaurantOrders } from "@/app/api/admin";
import DataGridDemo from "@/app/ui/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useAuthStore } from "@/app/store/user";

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (restaurantId && token) {
          const orders = await restaurantOrders(restaurantId, token);
          setOrders(orders);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      editable: false,
      sortable: true,
    },

    {
      field: "tableId",
      headerName: "Table ID",
      sortable: true,
      editable: false,
      width: 160,
    },
    {
      field: "userId",
      headerName: "User ID",
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
    <div className="flex flex-row justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <DataGridDemo rows={orders} columns={columns} form="orders" />
        </div>
      )}
    </div>
  );
};

export default Order;
