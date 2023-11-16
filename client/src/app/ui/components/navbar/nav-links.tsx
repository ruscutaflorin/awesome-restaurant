"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/details",
  },
  { name: "Restaurants", href: "/restaurants" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return links.map((link) => {
    return (
      <Link key={link.name} href={link.href}>
        <div
          className={clsx(
            "flex h-[48px] grow items-center justify-center px-3 mx-auto",
            {
              "bg-sky-100 text-blue-600": pathname == link.href,
            }
          )}
        >
          {link.name}
        </div>
      </Link>
    );
  });
};

export default NavLinks;
