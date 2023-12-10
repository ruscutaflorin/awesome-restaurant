import {
  RESTAURANT_DEFAULT_DESCRIPTION,
  RESTAURANT_DEFAULT_SLOGAN,
} from "@/app/utils/constants";
import React from "react";

type Props = {
  slogan: string | undefined | null;
  description: string | undefined | null;
};

const RestaurantHeaderText: React.FC<Props> = (
  restaurant: Props
): JSX.Element => {
  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">
        {restaurant?.slogan ? restaurant.slogan : RESTAURANT_DEFAULT_SLOGAN}
      </h1>
      <p>
        {restaurant?.description
          ? restaurant.description
          : RESTAURANT_DEFAULT_DESCRIPTION}
      </p>
    </div>
  );
};

export default RestaurantHeaderText;
