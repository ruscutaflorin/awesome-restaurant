"use client";
import React, { useEffect, useState } from "react";
import { fetchRestaurants, searchRestaurants } from "../api/restaurants";
import { Restaurant } from "../types/types";
import CardRestaurant from "../ui/restaurantsPage/card-restaurant";
import Pagination from "../ui/restaurantsPage/pagination";
import Search from "../ui/restaurantsPage/search";
import { useSearchParams } from "next/navigation";
import { RESTAURANTS_PER_PAGE } from "../../lib/utils/constants";
import { useAuthStore } from "../store/user";

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(RESTAURANTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useAuthStore((state) => state.token);
  const searchParams = useSearchParams();
  const offsetQueryParam = searchParams.get(`offset`);
  const limitQueryParam = searchParams.get(`limit`);
  const searchQueryParam = searchParams.get(`query`);
  useEffect(() => {
    if (offsetQueryParam) {
      setCurrentPage(parseInt(offsetQueryParam));
    }
    if (limitQueryParam) {
      setLimit(parseInt(limitQueryParam));
    }
  }, []);
  useEffect(() => {
    const effect = async () => {
      try {
        if (currentPage === null) {
          return;
        }
        const res = await fetchRestaurants(currentPage, limit, token);
        console.log(res.data);
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.numberOfPages);
      } catch (err) {
        console.log(err);
      }
    };
    effect();
  }, [currentPage, token]);

  useEffect(() => {
    try {
      const effect = async () => {
        if (searchQueryParam) {
          setSearchQuery(searchQueryParam);
          if (currentPage === null) {
            return;
          }
          const res = await searchRestaurants(
            currentPage,
            limit,
            token,
            searchQueryParam
          );
          setRestaurants(res.data.restaurants);
          setTotalPages(res.data.numberOfPages);
        }
      };
      effect();
    } catch (err) {
      console.log(err);
    }
  }, [searchQuery]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-100">
      <main className="my-5 mx-auto">
        <Search placeholder="Type..." onSearchChange={handleSearchChange} />
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
/*
TODO:pe pagina de restaurante sa intorc un arr de restaurante cu mai putine detalii
TODO:cand merg pe restaurant cu GO il trimit pe url restaurant/id si acolo fac requestul mare.
TODO: sa imbunatatesc searchul
*/
