import React from "react";
import { RestaurantDetailed } from "@/app/types/types";
import RestaurantHeaderImage from "../components/restaurant/image-header";
import restaurantImage from "@../../../public/restaurant-view.jpg";
import RestaurantHeaderText from "../components/restaurant/restaurant-header";
import DarkButton from "../components/dark-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  restaurant: RestaurantDetailed | null;
};

const RestaurantWelcomePage: React.FC<Props> = ({ restaurant }: Props) => {
  const pathname = usePathname();
  if (restaurant) {
    restaurant.contact = null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <RestaurantHeaderImage
          src={restaurant?.contact || restaurantImage.src}
        />
        <h1 className="text-4xl font-bold mt-4">{restaurant?.name}</h1>
        <h2 className="text-2xl font-semibold mt-2">
          {restaurant?.businessHours}
        </h2>
      </div>
      <div className="text-center">
        <RestaurantHeaderText
          slogan={restaurant?.contact}
          description={restaurant?.contact}
        />
        <div className="mt-10">
          <Link
            href={{
              pathname: `${pathname}/home`,
            }}
            passHref
          >
            <DarkButton text={"Enter"} width="10rem" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantWelcomePage;
