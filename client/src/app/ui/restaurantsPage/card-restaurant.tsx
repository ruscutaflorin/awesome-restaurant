import React from "react";
import Image from "next/image";
import restaurantIcon from "../../../../public/def-img.svg";
import Link from "next/link";
import DarkButton from "../components/dark-button";
import Rating from "./rating";
import { Restaurant, Review } from "@/app/types/types";

type Props = {
  profilePicture?: HTMLImageElement;
  name: string;
  description: string;
  restaurant: Restaurant;
  reviews: Review[];
};

const calculateMeanRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};
const RestaurantCard: React.FC<Props> = ({
  profilePicture,
  name,
  description,
  restaurant,
  reviews,
}: Props): JSX.Element => {
  const meanRating = calculateMeanRating(reviews);
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-2 w-full">
      <div className="flex flex-row border-b-2 border-gray-200">
        <figure className="my-auto mx-auto p-4">
          {profilePicture ? (
            <Image
              src={profilePicture.src}
              width={100}
              height={100}
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
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold text-mediumGrey mb-2">{name}</h2>
          <p className="text-mediumGrey mb-2">{description}</p>
          <p className="text-mediumGrey">{restaurant.businessHours}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Rating stars={meanRating} />
          <Link href={`/restaurants/${restaurant.uuid}`} passHref>
            <DarkButton text={"GO"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
