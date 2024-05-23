import React from "react";
import NavLinks from "./nav-links";
import DarkButton from "../dark-button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed-top bg-opacity-90 bg-white backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        <div className="logo">
          <h1 className="text-xl font-bold">
            <a href="/">restaurantReady</a>
          </h1>
        </div>
        <nav id="navbar" className="hidden lg:flex">
          <ul className="flex space-x-4">
            <NavLinks />
          </ul>
        </nav>
        <div className="lg:hidden">
          <i className="bi bi-list text-2xl cursor-pointer"></i>
        </div>
        <Link href="/restaurants" replace>
          <DarkButton text={"Book a table"} hover="hover:bg-zinc-600" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
