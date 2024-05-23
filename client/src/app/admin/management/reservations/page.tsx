"use client";
import { restaurantReservations } from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";
import { Reservation } from "@/app/types/types";
import DisplayReservations from "@/app/ui/adminPage/management/reservations/DisplayReservations";
import ReservationManagement from "@/app/ui/adminPage/management/reservations/ReservationsForm";
import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const token = useAuthStore((state) => state.token);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (restaurantId && token) {
          const orders = await restaurantReservations(restaurantId, token);
          setReservations(orders);
          setLoading(false);
          console.log(orders);
        }
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
          {isFormVisible && (
            <ReservationManagement
              reservations={reservations}
              onClose={toggleFormVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;
