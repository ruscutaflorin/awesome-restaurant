import React from "react";
import heroImage from "../../../../public/hero.avif";

type CardProps = {
  title?: string;
  description?: string;
};

function Card({ title, description }: CardProps): JSX.Element {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white my-5 mx-auto sm:mx-4">
      <figure className="relative h-48 w-full">
        <img
          src={heroImage.src}
          alt="Hero"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-mediumGrey mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default Card;
