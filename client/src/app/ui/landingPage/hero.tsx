import React from "react";
import heroImage from "../../../../public/restaurant-hero.jpg";
import { Button } from "@/components/ui/button";
const Hero = () => {
  return (
    <div
      className="hero-container flex justify-center items-center bg-cover bg-center bg-no-repeat h-96 relative"
      style={{
        backgroundImage: `url(${heroImage.src})`,
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">header text</h1>
          <p className="mb-5 text-white">
            Explore diverse cuisines, exclusive deals, and hidden gems. Your
            ultimate dining companion connects food enthusiasts with local
            restaurants effortlessly.
          </p>
          <Button className="text-white">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
