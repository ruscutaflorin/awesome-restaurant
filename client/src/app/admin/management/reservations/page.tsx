import { Reservation } from "@/app/types/types";
import ReservationManagement from "@/app/ui/adminPage/management/reservations/modifyReservations";
import React from "react";
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
const Reservations = () => {
  return (
    <div>
      <ReservationManagement reservations={reservations} />
    </div>
  );
};

export default Reservations;
