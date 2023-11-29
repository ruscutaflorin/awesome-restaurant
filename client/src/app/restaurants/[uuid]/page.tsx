"use client";

import { getRestaurant } from "@/app/api/restaurants";
import { RestaurantDetailed } from "@/app/types/types";
import Menu from "@/app/ui/restaurant/menu";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const RestaurantDetails: React.FC<RestaurantDetailed> = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantDetailed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurant(params.uuid);
        setRestaurant(response.data);
        console.log(response.data);
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

  return (
    <div className="m-0 p-0">
      {loading && !restaurant ? (
        <div>Loading...</div>
      ) : (
        <Menu restaurant={restaurant} />
      )}
    </div>
  );
};

export default RestaurantDetails;
