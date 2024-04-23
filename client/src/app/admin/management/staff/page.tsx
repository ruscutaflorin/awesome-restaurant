import { StaffUserDetailed } from "@/app/types/types";
import StaffManagement from "@/app/ui/adminPage/management/staff/staffManagment";
import React from "react";
const staffUsers: StaffUserDetailed[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Waiter",
    userId: 101,
    restaurantId: 201,
    createdAt: new Date("2024-04-19T08:00:00"),
    updatedAt: new Date("2024-04-19T08:00:00"),
    permissions: [
      {
        id: 1,
        name: "Manage Orders",
        code: "manage_orders",
        createdAt: new Date("2024-04-19T08:00:00"),
        updatedAt: new Date("2024-04-19T08:00:00"),
      },
      {
        id: 2,
        name: "Manage Reservations",
        code: "manage_reservations",
        createdAt: new Date("2024-04-19T08:00:00"),
        updatedAt: new Date("2024-04-19T08:00:00"),
      },
    ],
    user: {
      id: 101,
      name: "John Doe",
      email: "john@example.com",
      password: "password",
      profilePic: null,
      createdAt: new Date("2024-04-19T08:00:00"),
      updatedAt: new Date("2024-04-19T08:00:00"),
    },
    restaurant: {
      id: 201,
      uuid: "abc123",
      name: "Restaurant ABC",
      address: "123 Main St",
      location: "City, State",
      businessHours: ["Mon-Fri: 9am-9pm", "Sat-Sun: 10am-8pm"],
      contact: "123-456-7890",
      ownerId: 301,
      createdAt: new Date("2024-04-19T08:00:00"),
      updatedAt: new Date("2024-04-19T08:00:00"),
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Chef",
    userId: 102,
    restaurantId: 201,
    createdAt: new Date("2024-04-19T09:00:00"),
    updatedAt: new Date("2024-04-19T09:00:00"),
    permissions: [
      {
        id: 3,
        name: "Manage Menu",
        code: "manage_menu",
        createdAt: new Date("2024-04-19T09:00:00"),
        updatedAt: new Date("2024-04-19T09:00:00"),
      },
    ],
    user: {
      id: 102,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password",
      profilePic: null,
      createdAt: new Date("2024-04-19T09:00:00"),
      updatedAt: new Date("2024-04-19T09:00:00"),
    },
    restaurant: {
      id: 201,
      uuid: "abc123",
      name: "Restaurant ABC",
      address: "123 Main St",
      location: "City, State",
      businessHours: ["Mon-Fri: 9am-9pm", "Sat-Sun: 10am-8pm"],
      contact: "123-456-7890",
      ownerId: 301,
      createdAt: new Date("2024-04-19T08:00:00"),
      updatedAt: new Date("2024-04-19T08:00:00"),
    },
  },
];
const Staff = () => {
  return (
    <div>
      <StaffManagement staffUsers={staffUsers} />
    </div>
  );
};

export default Staff;
