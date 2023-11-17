"use client";
import React, { useEffect, useState } from "react";
import ShowUser from "../ui/restaurantsPage/user";
import CardMobile from "../ui/restaurantsPage/card-mobile";
import Pagination from "../ui/restaurantsPage/pagination";
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
}; //mutat asta

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const restaurantsPerPage = 3;

  //TODO: offset cu params

  useEffect(() => {
    fetch("http://localhost:8000/api/restaurants")
      .then((res) => res.json())
      .then((message: Restaurant[]) => {
        setRestaurants(message);
      });
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  return (
    <main>
      <div className="my-10">
        <ShowUser name="florin" />
      </div>
      {currentRestaurants.map((restaurant, index) => (
        <div key={index} className="flex items-center justify-center mb-3">
          <CardMobile
            name={restaurant.name}
            description={restaurant.name}
            restaurant={restaurant}
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </main>
  );
};

export default Restaurants;
