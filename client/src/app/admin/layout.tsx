import React from "react";
import AdminNavbar from "../ui/adminPage/overview/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen  md:flex-row md:overflow-hidden bg-mediumGrey">
      <AdminNavbar />
      <div className="h-screen flex justify-center items-center w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
