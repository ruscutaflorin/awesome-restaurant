// pages/restaurants/[id].tsx
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Restaurant = {
  id: number;
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
  const [restaurant, setRestaurant] = useState<Restaurant | string>("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/restaurant/restaurants?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestaurant(data);
      });
  }, [params.id]);
  return (
    <div>
      {typeof restaurant !== "string" && restaurant !== null ? (
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
      ) : (
        <div>
          <p>hello</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
