"use client";
import React, { useEffect } from "react";
import AdminNavbar from "../ui/adminPage/navbar";
import AdminDashboard from "../ui/adminPage/dashboard";
const AdminPage = () => {
  return (
    <main className="flex h-screen bg-slate-700">
      <div className="navbar w-2/12">
        <AdminNavbar />
      </div>
      <div className="dashboard w-full">
        <AdminDashboard />
      </div>
    </main>
  );
};

export default AdminPage;
