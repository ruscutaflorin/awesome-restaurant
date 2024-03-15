import React from "react";
import defaultImage from "@/../../public/default-user.png";

type Props = {
  image: HTMLImageElement | null;
};

const RestaurantHeader: React.FC<Props> = ({ image }: Props): JSX.Element => {
  return (
    <div className="flex flex-row h-1/5 items-center justify-between my-5 mx-5">
      <div>
        <h1>Menu</h1>
      </div>
      <div>
        <h1>Search</h1>
      </div>
      <div className="avatar">
        <div className="w-12 mask mask-squircle">
          <img src={image ? image.src : defaultImage.src} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
