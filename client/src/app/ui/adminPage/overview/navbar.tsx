"use client";
import React, { useState } from "react";
import defaultImage from "@/../../public/default-user.png";
import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  PieChartIcon,
  ActivityLogIcon,
  ExitIcon,
} from "@radix-ui/react-icons";

const AdminNavbar = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (iconName: any) => {
    setSelectedIcon(iconName);
  };

  return (
    <main className="flex flex-col justify-between items-center h-screen bg-slate-900 w-full">
      <div className="user-info mt-10 mx-2">
        <img
          src={defaultImage.src}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-gray-500 text-sm mt-1 text-white">Admin</h1>
      </div>
      <div className="navbar flex flex-col justify-center items-center gap-4 mt-4">
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "dashboard" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <DashboardIcon
            className={`w-8 h-16 ${
              selectedIcon === "dashboard" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("dashboard")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "activityLog" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <ActivityLogIcon
            className={`w-8 h-16 ${
              selectedIcon === "activityLog" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("activityLog")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "pieChart" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <PieChartIcon
            className={`w-8 h-16 ${
              selectedIcon === "pieChart" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("pieChart")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-16 mr-2 ${
              selectedIcon === "person" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <PersonIcon
            className={`w-8 h-8 ${
              selectedIcon === "person" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("person")}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-1 h-8 mr-2 ${
              selectedIcon === "gear" ? "bg-red-500" : "bg-transparent"
            }`}
          ></div>
          <GearIcon
            className={`w-8 h-8 ${
              selectedIcon === "gear" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleIconClick("gear")}
          />
        </div>
      </div>
      <div className="logout mb-16">
        <ExitIcon className="w-8 h-8 text-gray-500" />
      </div>
    </main>
  );
};

export default AdminNavbar;
