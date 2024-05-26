import React from "react";
import Image from "next/image";
import productImage from "@/../public/man-cutting-grilled-salmon-served-with-rice-lula-kebab-lice-tomatoes-wine.jpg";
import { StarFilledIcon, InfoCircledIcon } from "@radix-ui/react-icons";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  basePrice: number;
  ingredients: string[];
  availability: boolean;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden m-2 w-full">
      <figure className="my-auto mx-auto p-4">
        <Image
          src={productImage.src}
          width={130}
          height={130}
          alt="Profile"
          className="object-cover rounded-md"
          priority={true}
        />
      </figure>
      <div className="flex-1 p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <StarFilledIcon className="w-6 h-6 text-yellow-500" />
          <span className="text-gray-600 ml-2">4.5</span>
          <InfoCircledIcon className="w-6 h-6 ml-4" />
          <span className="text-gray-600 ml-2">Info</span>
        </div>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p>Ingredients: {product.ingredients.join(", ")}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            ${product.price}
          </span>
          <button
            onClick={() => product.availability && addToCart(product)}
            className={`px-4 py-2 rounded ${
              product.availability
                ? "bg-orange-700 hover:bg-orange-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.availability ? (
              <p className="text-white">Add to cart</p>
            ) : (
              <p className="text-white">Out of stock</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
