"use client";
import { RestaurantDetailed } from "@/app/types/types";
import React, { useEffect, useState } from "react";
import { getRestaurant } from "@/app/api/restaurants";
import { useParams } from "next/navigation";
import RestaurantHeader from "@/app/ui/restaurant/header";
import RestaurantFeaturedItems from "@/app/ui/restaurant/featured";
import RestaurantSearch from "@/app/ui/restaurant/search";
import RestaurantProductCard from "@/app/ui/components/product-card";
import image from "@/../../public/restaurant-icon.svg";
import { useAuthStore } from "@/app/store/user";
export const RestaurantHomePage = () => {
  const [restaurant, setRestaurant] = useState<RestaurantDetailed | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurant(params.uuid, token);
        setRestaurant(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    effect();
  }, [params.uuid]);

  if (loading) {
    return "loading...";
  }

  // TODO: image field in restaurant db
  return (
    <div>
      <RestaurantHeader image={null} />
      <RestaurantSearch />
      {/* <CategoriesCarousel /> */}
      <p className="ml-20">Featured Items</p>
      <RestaurantFeaturedItems />
      <p className="ml-20">People are looking for 🔥</p>
      <RestaurantProductCard image={image} name={restaurant?.name} price={0} />
      <RestaurantProductCard image={image} name={restaurant?.name} price={0} />
    </div>
  );
};

export default RestaurantHomePage;
