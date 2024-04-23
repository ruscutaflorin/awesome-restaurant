import React from "react";
import AdminNavbar from "../ui/adminPage/overview/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <AdminNavbar />
      <div className="h-screen flex justify-center items-center mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
