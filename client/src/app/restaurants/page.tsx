"use client";
import React, { useEffect, useState } from "react";
import { fetchRestaurants, searchRestaurants } from "../api/restaurants";
import { Restaurant, RestaurantWReviews } from "../types/types";
import CardRestaurant from "../ui/restaurantsPage/card-restaurant";
import Pagination from "../ui/restaurantsPage/pagination";
import Search from "../ui/restaurantsPage/search";
import { useSearchParams } from "next/navigation";
import { RESTAURANTS_PER_PAGE } from "../../lib/utils/constants";
import { useAuthStore } from "../store/user";

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWReviews[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(RESTAURANTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useAuthStore((state) => state.token);
  const searchParams = useSearchParams();
  const offsetQueryParam = searchParams.get("offset");
  const limitQueryParam = searchParams.get("limit");
  const searchQueryParam = searchParams.get("query");

  useEffect(() => {
    if (offsetQueryParam) {
      setCurrentPage(parseInt(offsetQueryParam, 10));
    } else {
      setCurrentPage(0);
    }
    if (limitQueryParam) {
      setLimit(parseInt(limitQueryParam, 10));
    }
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [offsetQueryParam, limitQueryParam, searchQueryParam]);

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        if (searchQuery) {
          const res = await searchRestaurants(
            currentPage,
            limit,
            token,
            searchQuery
          );
          setRestaurants(res.data.restaurants);
          setTotalPages(res.data.numberOfPages);
        } else {
          const res = await fetchRestaurants(currentPage, limit, token);
          setRestaurants(res.data.restaurants);
          setTotalPages(res.data.numberOfPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEffect();
  }, [currentPage, limit, searchQuery, token]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };
  console.log(restaurants);
  return (
    <div className="flex flex-col min-h-screen bg-bgColor my-0">
      <main className="my-5 mx-auto">
        <Search placeholder="Type..." onSearchChange={handleSearchChange} />
        {restaurants &&
          restaurants.map((restaurant, index) => (
            <div key={index} className="flex items-center justify-center mb-3">
              <CardRestaurant
                name={restaurant.name}
                description={restaurant.name}
                restaurant={restaurant}
                reviews={restaurant.reviews}
              />
            </div>
          ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          hasPreviousPage={currentPage > 0}
          hasNextPage={currentPage < totalPages - 1}
          limit={limit}
        />
      </main>
    </div>
  );
};

export default Restaurants;
