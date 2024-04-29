"use client";
import { restaurantReservations } from "@/app/api/admin";
import { Reservation } from "@/app/types/types";
import DisplayReservations from "@/app/ui/adminPage/management/reservations/DisplayReservations";
import ReservationManagement from "@/app/ui/adminPage/management/reservations/ReservationsForm";
import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await restaurantReservations(1);
        setReservations(orders);
        setLoading(false);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-column">
          <DisplayReservations reservations={reservations} />
          <ReservationManagement reservations={reservations} />
        </div>
      )}
    </div>
  );
};

export default Reservations;
