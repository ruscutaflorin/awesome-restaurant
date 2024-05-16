"use client";
import { getRestaurant } from "@/app/api/restaurants";
import { useAuthStore } from "@/app/store/user";
import { RestaurantDetailed } from "@/app/types/types";
import RestaurantWelcomePage from "@/app/ui/restaurant/welcome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// TODO_BACK: camp de slogan si camp de description pe restaurant.
// TODO_BACK: camp de description pe restaurant.
// TODO_BACK: camp de imagine pe restaurant.

const RestaurantDetails: React.FC<RestaurantDetailed> = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantDetailed | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurant(params.uuid, token);
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
        <RestaurantWelcomePage restaurant={restaurant} />
      )}
    </div>
  );
};

export default RestaurantDetails;
