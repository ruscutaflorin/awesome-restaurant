import React from "react";
import { Restaurant } from "@/app/types/types";

const TopBar = () => {
  return (
    <section
      id="topbar"
      className="flex items-center fixed top-0 w-full topbar-transparent"
    >
      <div className="container mx-auto flex items-center justify-center lg:justify-start">
        <i className="bi bi-phone flex items-center">
          <span className="ml-2">+216 53 283 233</span>
        </i>
        <i className="bi bi-clock ms-4 hidden lg:flex items-center">
          <span className="ml-2">Mon-Thu: 12:00 AM - 23:00 PM</span>
        </i>
        <i className="bi bi-clock ms-4 hidden lg:flex items-center">
          <span className="ml-2">Fri-Sun: 12:00 AM - 00:00 PM</span>
        </i>
      </div>
    </section>
  );
};

export default TopBar;
