import React from "react";
import { RestaurantDetailed } from "@/app/types/types";
import RestaurantHeaderImage from "../components/restaurant/image-header";
import restaurantImage from "@../../../public/restaurant-view.jpg";
import RestaurantHeaderText from "../components/restaurant/restaurant-header";
import DarkButton from "../components/dark-button";

type Props = {
  restaurant: RestaurantDetailed | null;
};
const RestaurantWelcomePage: React.FC<Props> = ({ restaurant }: Props) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex-1 flex items-center">
        <RestaurantHeaderImage
          src={restaurant?.contact || restaurantImage.src}
        />
      </div>
      <div className="flex-1 mx-auto my-auto text-center">
        <RestaurantHeaderText
          slogan={restaurant?.contact}
          description={restaurant?.contact}
        />
        <div className="mt-10 flex items-center justify-center">
          <DarkButton text={"=>"} width="10rem" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantWelcomePage;
