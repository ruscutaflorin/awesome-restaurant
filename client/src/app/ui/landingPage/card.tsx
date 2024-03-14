import React from "react";
import heroImage from "../../../../public/hero.avif";

type CardProps = {
  title?: string;
  description?: string;
};

function Card({ title, description }: CardProps): JSX.Element {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={heroImage.src} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}!</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;
