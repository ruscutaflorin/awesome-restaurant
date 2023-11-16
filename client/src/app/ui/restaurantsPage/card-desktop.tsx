import React from "react";
import restaurantIcon from "../../../../public/restaurant-view.jpg";
import Image from "next/image";
import DarkButton from "../components/dark-button";
type Props = {
  profilePicture?: HTMLImageElement;
  name: string;
  description: string;
};
const CardDesktop = ({
  profilePicture,
  name,
  description,
}: Props): JSX.Element => {
  return (
    <div className="card w-60 glass">
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
            width={50}
            height={50}
            alt="Default Profile"
            className="w-full h-full object-cover"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <DarkButton text={"Order Now!"} />
        </div>
      </div>
    </div>
  );
};

export default CardDesktop;
