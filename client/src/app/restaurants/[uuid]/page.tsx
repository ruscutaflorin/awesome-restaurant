"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Restaurant = {
  id: number;
  uuid: string;
  name: string;
  address: string;
  location: string;
  businessHours: string[];
  contact: null | any;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  reservations: any[];
  categories: any[];
  reviews: any[];
  diningTables: any[];
};
//TODO: sa mi aduc toate tipurile din back

const RestaurantDetails: React.FC = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8000/api/restaurants/${params.uuid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestaurant(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [params.uuid]);
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
  return (
    <div>
      {restaurant && (
        <>
          <h1>{restaurant.name}</h1>
          <p>Address: {restaurant.address}</p>
          <p>Location: {restaurant.location}</p>
          {restaurant.businessHours && (
            <p>Business Hours: {restaurant.businessHours.join(", ")}</p>
          )}

          <h2>Reservations:</h2>
          {restaurant.reservations &&
            restaurant.reservations.map((reservation) => (
              <div key={reservation.id}>
                <p>Reservation Date: {reservation.reservationDate}</p>
                <p>Number of Guests: {reservation.numberOfGuests}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
