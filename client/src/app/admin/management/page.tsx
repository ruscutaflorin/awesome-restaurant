import React from "react";
import RestaurantDetailsUI from "../../ui/adminPage/management/restaurant/DetailsForm";
import { Restaurant, StaffUserDetailed } from "@/app/types/types";
import StaffForm from "@/app/ui/adminPage/management/restaurant/StaffForm";
import DetailsForm from "../../ui/adminPage/management/restaurant/DetailsForm";
const restaurant: Restaurant = {
  id: 1,
  uuid: "restaurant123",
  name: "Tasty Grill",
  address: "456 Oak Street",
  location: "Townsville",
  businessHours: ["Monday-Friday: 9am-10pm", "Saturday-Sunday: 10am-11pm"],
  contact: "555-123-4567",
  ownerId: 123,
  createdAt: new Date("2024-04-19"),
  updatedAt: new Date("2024-04-19"),
};

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

const RestaurantDetails = () => {
  return (
    <div className="flex flex-row justify-evenly items-center">
      <DetailsForm restaurant={restaurant} />
      <StaffForm staffUsers={staffUsers} />
    </div>
  );
};

export default RestaurantDetails;
