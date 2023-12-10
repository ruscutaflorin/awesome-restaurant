import React from "react";
import Image from "next/image";
import restaurantIcon from "../../../../public/def-img.svg";
import Link from "next/link";
import DarkButton from "../components/dark-button";
import Rating from "./rating";
import { Restaurant } from "@/app/types/types";
type Props = {
  profilePicture?: HTMLImageElement;
  name: string;
  description: string;
  restaurant: Restaurant;
};
const RestaurantCard: React.FC<Props> = ({
  profilePicture,
  name,
  description,
  restaurant,
}: Props): JSX.Element => {
  return (
    <div className="flex flex-row bg-transparent border-b-2 border-b-black">
      <figure className="my-auto mx-auto p-2">
        {profilePicture ? (
          <Image
            src={profilePicture.src}
            width={15}
            height={15}
            alt="Profile"
            className="object-cover rounded-md"
          />
        ) : (
          <Image
            src={restaurantIcon.src}
            width={100}
            height={100}
            alt="Default Profile"
            className="object-cover rounded-md"
            priority={true}
          />
        )}
      </figure>
      <div className="card-body m-0 p-0">
        <h2 className="card-title">{name}</h2>
        <h2>{description}</h2>
        <h2>{restaurant.businessHours}</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Rating />
        <Link href={`/restaurants/${restaurant.uuid}`} passHref>
          <DarkButton text={"GO"} />
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
