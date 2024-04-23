import OrderTable from "@/app/ui/adminPage/management/orders/orders";
import React from "react";
import { Order } from "@/app/types/types";
const orders: Order[] = [
  {
    id: 1,
    status: "Pending",
    orderDate: new Date("2024-04-19T10:30:00"),
    totalAmount: 575,
    tableId: 1,
    userId: 123,
    createdAt: new Date("2024-04-19T10:30:00"),
    updatedAt: new Date("2024-04-19T10:30:00"),
  },
  {
    id: 2,
    status: "Completed",
    orderDate: new Date("2024-04-20T11:45:00"),
    totalAmount: 65,
    tableId: 2,
    userId: 1,
    createdAt: new Date("2024-04-20T11:45:00"),
    updatedAt: new Date("2024-04-20T11:45:00"),
  },
  {
    id: 3,
    status: "Processing",
    orderDate: new Date("2002-12-02T00:00:00"),
    totalAmount: 1000,
    tableId: 3,
    userId: 456,
    createdAt: new Date("2002-12-02T00:00:00"),
    updatedAt: new Date("2002-12-02T00:00:00"),
  },
];
const Order = () => {
  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Order;
