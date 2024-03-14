import React from "react";
import restaurantIcon from "../../../../public/restaurant-view.jpg";
import Image from "next/image";
import Rating from "./rating";
import DarkButton from "../components/dark-button";
import Link from "next/link";
type Props = {
  profilePicture?: HTMLImageElement;
  name: string;
  description: string;
  restaurant: {
    id: number;
    uuid: string;
    name: string;
    address: string;
    location: string;
    businessHours: string[];
    contact: null | any;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
  };
};
const CardMobile: React.FC<Props> = ({
  profilePicture,
  name,
  description,
  restaurant,
}: Props): JSX.Element => {
  return (
    <div className="card flex flex-row w-60 glass m-auto w-auto">
      <figure>
        {profilePicture ? (
          <Image
            src={profilePicture.src}
            width={50}
            height={50}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={restaurantIcon.src}
            width={100}
            height={100}
            alt="Default Profile"
            className="w-full h-full object-cover"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <Link href={`/restaurants/${restaurant.uuid}`} passHref>
          <DarkButton text={"Eat"} />
        </Link>
      </div>
      <Rating />
    </div>
  );
};

export default CardMobile;
