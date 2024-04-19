import React from "react";
import AdminNavbar from "../ui/adminPage/overview/navbar";
import AdminDashboard from "../ui/adminPage/overview/dashboard";
import RestaurantDetails from "../ui/adminPage/restaurantDetails/restaurantDetails";
import {
  Category,
  Restaurant,
  DiningTable,
  Order,
  Product,
  Reservation,
  StaffUserDetailed,
} from "../types/types";
import ModifyCategory from "../ui/adminPage/management/category/modifyCategory";
import ModifyDiningTables from "../ui/adminPage/management/dinningTables/modifyDiningTables";
import OrderTable from "../ui/adminPage/management/orders/orders";
import ProductForm from "../ui/adminPage/management/product/modifyProducts";
import ReservationManagement from "../ui/adminPage/management/reservations/modifyReservations";
import StaffManagement from "../ui/adminPage/management/staff/staffManagment";

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

const categories: Category[] = [
  {
    id: 1,
    name: "Appetizers",
    restaurantId: 123,
    createdAt: new Date("2024-04-19"),
    updatedAt: new Date("2024-04-19"),
  },
  {
    id: 2,
    name: "Main Course",
    restaurantId: 123,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: 3,
    name: "Desserts",
    restaurantId: 123,
    createdAt: new Date("2024-04-21"),
    updatedAt: new Date("2024-04-21"),
  },
  {
    id: 4,
    name: "Beverages",
    restaurantId: 123,
    createdAt: new Date("2024-04-22"),
    updatedAt: new Date("2024-04-22"),
  },
  {
    id: 5,
    name: "Specials",
    restaurantId: 123,
    createdAt: new Date("2024-04-23"),
    updatedAt: new Date("2024-04-23"),
  },
];

const diningTables: DiningTable[] = [
  {
    id: 1,
    name: "Table 1",
    status: "Occupied",
    capacity: 4,
    positionX: 100,
    positionY: 150,
    restaurantId: 123,
    createdAt: new Date("2024-04-19"),
    updatedAt: new Date("2024-04-19"),
  },
  {
    id: 2,
    name: "Table 2",
    status: "Vacant",
    capacity: 6,
    positionX: 200,
    positionY: 250,
    restaurantId: 123,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: 3,
    name: "Table 3",
    status: "Vacant",
    capacity: 2,
    positionX: 300,
    positionY: 200,
    restaurantId: 123,
    createdAt: new Date("2024-04-21"),
    updatedAt: new Date("2024-04-21"),
  },
];

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
    totalAmount: 35,
    tableId: 3,
    userId: 456,
    createdAt: new Date("2002-12-02T00:00:00"),
    updatedAt: new Date("2002-12-02T00:00:00"),
  },
];

const reservations: Reservation[] = [
  {
    id: 1,
    restaurantId: 1,
    tableId: 1,
    reservationDate: new Date("2024-04-19T18:30:00"),
    numberOfGuests: 4,
    customerName: "John Doe",
    customerPhone: "123-456-7890",
    customerEmail: "john@example.com",
    reservationStatus: "Confirmed",
    createdAt: new Date("2024-04-18T12:30:00"),
    updatedAt: new Date("2024-04-19T10:15:00"),
  },
  {
    id: 2,
    restaurantId: 1,
    tableId: 2,
    reservationDate: new Date("2024-04-20T19:00:00"),
    numberOfGuests: 2,
    customerName: "Jane Smith",
    customerPhone: "987-654-3210",
    customerEmail: "jane@example.com",
    reservationStatus: "Pending",
    createdAt: new Date("2024-04-19T09:45:00"),
    updatedAt: new Date("2024-04-19T09:45:00"),
  },
  {
    id: 3,
    restaurantId: 2,
    tableId: 1,
    reservationDate: new Date("2024-04-21T17:00:00"),
    numberOfGuests: 6,
    customerName: "Alice Johnson",
    customerPhone: "555-555-5555",
    customerEmail: null,
    reservationStatus: "Confirmed",
    createdAt: new Date("2024-04-20T14:20:00"),
    updatedAt: new Date("2024-04-20T14:20:00"),
  },
];

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
const AdminPage = () => {
  return (
    <div>
      <main className="flex h-screen bg-slate-700">
        <div className="navbar w-2/12">
          <AdminNavbar />
        </div>
        <div className="dashboard w-full">
          <AdminDashboard />
        </div>
      </main>
      <RestaurantDetails restaurant={restaurant} />
      <ModifyCategory categories={categories} />
      <ModifyDiningTables diningTables={diningTables} />
      <OrderTable orders={orders} />
      <ProductForm categories={categories} />
      <ReservationManagement reservations={reservations} />
      <StaffManagement staffUsers={staffUsers} />
    </div>
  );
};

export default AdminPage;
