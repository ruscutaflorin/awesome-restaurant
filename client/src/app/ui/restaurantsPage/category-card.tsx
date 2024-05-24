import React from "react";
import Image from "next/image";
import categoryImage from "@/../public/salad.jpg";

interface CategoryCardProps {
  categoryName: string;
  itemCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  itemCount,
}) => {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg my-4">
      <figure>
        <Image
          src={categoryImage.src}
          alt={categoryName}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </figure>
      <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
        <h2 className="text-white text-xl font-bold">{categoryName}</h2>
        <p className="text-white">{itemCount} items</p>
      </div>
    </div>
  );
};

export default CategoryCard;
