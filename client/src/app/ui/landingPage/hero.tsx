import React from "react";
import heroImage from "../../../../public/restaurant-hero.jpg";
const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImage.src})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">header text</h1>
          <p className="mb-5">
            Explore diverse cuisines, exclusive deals, and hidden gems. Your
            ultimate dining companion connects food enthusiasts with local
            restaurants effortlessly.
          </p>
          <button className="btn btn-default">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
