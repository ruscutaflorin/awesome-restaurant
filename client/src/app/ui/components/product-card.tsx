import { RestaurantDetailed } from "@/app/types/types";
import React from "react";
import DarkButton from "./dark-button";
type Props = {
  image: HTMLImageElement;
  name: string | undefined;
  price: number;
};
const RestaurantProductCard = ({ image, name, price }: Props) => {
  function onAddToCart(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-row justify-center align-center mx-auto my-2">
      <img className="w-1/4" src={image.src} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">${price.toFixed(2)}</p>
      </div>
      <div className="flex h-full justify-center align-center my-auto p-2">
        <DarkButton text={"Add to Cart"} />
      </div>
    </div>
  );
};

export default RestaurantProductCard;
