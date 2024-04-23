import React from "react";
import AdminDashboard from "../ui/adminPage/overview/dashboard";

const AdminPage = () => {
  return (
    <div>
      <main className="flex flex-col h-screen bg-slate-600">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
