"use client";
import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/restaurants";
import { Restaurant } from "../types/types";
import CardRestaurant from "../ui/restaurantsPage/card-restaurant";
import Pagination from "../ui/restaurantsPage/pagination";
import Search from "../ui/restaurantsPage/search";
import { useSearchParams } from "next/navigation";
import { RESTAURANTS_PER_PAGE } from "../utils/constants";
const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(RESTAURANTS_PER_PAGE);

  const searchParams = useSearchParams();
  const offset = searchParams.get(`offset`);
  const limitQueryParam = searchParams.get(`limit`);

  useEffect(() => {
    if (offset) {
      setCurrentPage(parseInt(offset));
    }
    if (limitQueryParam) {
      setLimit(parseInt(limitQueryParam));
    }
  }, []);
  /* implementez limit lfl ca offset si pe linia 30 ii dau si limita,
daca limita nu exista, limita by default e 4 */
  useEffect(() => {
    const effect = async () => {
      try {
        if (currentPage === null) {
          return;
        }
        const res = await fetchRestaurants(currentPage, limit);
        console.log(res.data);
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.numberOfPages);
      } catch (err) {
        console.log(err);
      }
    };
    effect();
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-100">
      <main className="my-5 mx-auto">
        <Search placeholder="Type..." />
        {restaurants &&
          restaurants.map((restaurant, index) => (
            <div key={index} className="flex items-center justify-center mb-3">
              <CardRestaurant
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
          hasPreviousPage={true}
          hasNextPage={true}
          limit={limit}
        />
      </main>
    </div>
  );
};

export default Restaurants;
