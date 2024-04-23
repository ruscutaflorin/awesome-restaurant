"use client";
import React, { useState } from "react";
import { Reservation } from "@/app/types/types";

interface ReservationManagementProps {
  reservations: Reservation[];
}

const ReservationManagement: React.FC<ReservationManagementProps> = ({
  reservations,
}) => {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reservation Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border rounded-md p-4 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => handleReservationClick(reservation)}
          >
            <p className="font-bold">Reservation ID: {reservation.id}</p>
            <p>
              Reservation Date:{" "}
              {reservation.reservationDate.toLocaleString("en-GB", {
                timeZone: "UTC",
              })}
            </p>
            <p>Number of Guests: {reservation.numberOfGuests}</p>
            <p>Status: {reservation.reservationStatus}</p>
          </div>
        ))}
      </div>
      {selectedReservation && (
        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-2">Selected Reservation</h2>
          <p>Reservation ID: {selectedReservation.id}</p>
          <p>
            Reservation Date:{" "}
            {selectedReservation.reservationDate.toLocaleString("en-GB", {
              timeZone: "UTC",
            })}
          </p>
          <p>Number of Guests: {selectedReservation.numberOfGuests}</p>
          <p>Status: {selectedReservation.reservationStatus}</p>
          {/* Add more details or actions here */}
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
