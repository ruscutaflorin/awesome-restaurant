"use client";
import React, { useState } from "react";
import defaultImage from "@/../../public/default-user.png";
import {
  PersonIcon,
  ExitIcon,
  HomeIcon,
  ArchiveIcon,
  TableIcon,
  ReaderIcon,
  IconJarLogoIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useLogout } from "@/app/hooks/useLogout";
const AdminNavbar = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const { push } = useRouter();
  const { logOut } = useLogout();
  const handleIconClick = (iconName: any) => {
    let redirectURL = "";
    switch (iconName) {
      case "home":
        redirectURL = "/admin";
        break;
      case "archive":
        redirectURL = "/admin/management/categories";
        break;
      case "table":
        redirectURL = "/admin/management/dining";
        break;
      case "reader":
        redirectURL = "/admin/management/orders";
        break;
      case "iconjar":
        redirectURL = "/admin/management/products";
        break;
      case "calendar":
        redirectURL = "/admin/management/reservations";
        break;
      case "person":
        redirectURL = "/admin/management";
        break;
      case "logout":
        redirectURL = "/login";
        logOut();
        break;
      default:
        break;
    }
    push(redirectURL);
    setSelectedIcon(iconName);
  };
  return (
    <main className="flex flex-col justify-between items-center h-screen bg-veryPaleGrey w-1/12">
      <div className="user-info mt-10 mx-2">
        <img
          src={defaultImage.src}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-gray-500 text-sm mt-1">Admin</h1>
      </div>
      <div className="navbar flex flex-col justify-center items-center gap-4 mt-4">
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "home" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <HomeIcon
            className={`w-8 h-16 ${
              selectedIcon === "home" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("home")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "archive" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <ArchiveIcon
            className={`w-8 h-16 ${
              selectedIcon === "archive" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("archive")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "table" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <TableIcon
            className={`w-8 h-16 ${
              selectedIcon === "table" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("table")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "reader" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <ReaderIcon
            className={`w-8 h-16 ${
              selectedIcon === "reader" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("reader")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-8 mr-2 ${
              selectedIcon === "iconjar" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <IconJarLogoIcon
            className={`w-8 h-16 ${
              selectedIcon === "iconjar" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("iconjar")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-8 mr-2 ${
              selectedIcon === "calendar" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <CalendarIcon
            className={`w-8 h-16 ${
              selectedIcon === "calendar" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("calendar")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-8 mr-2 ${
              selectedIcon === "person" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <PersonIcon
            className={`w-8 h-16 ${
              selectedIcon === "person" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("person")}
          />
        </div>
      </div>
      <div className="navbar flex flex-col justify-center items-center gap-4  mb-16">
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "logout" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <ExitIcon
            className={`w-8 h-16 ${
              selectedIcon === "logout" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("logout")}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminNavbar;
