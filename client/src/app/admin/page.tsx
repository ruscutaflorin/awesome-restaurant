import React from "react";
import Earning from "../ui/adminPage/earning";
import Customers from "../ui/adminPage/customers";
import EmployeesRecruit from "../ui/adminPage/employeesRecruit";
import TotalOrders from "../ui/adminPage/totalOrders";

const AdminPage = () => {
  return (
    <main className="bg-slate-700">
      <div className="grid grid-cols-4 gap-4">
        {/* First Row */}
        <div className="col-span-4 grid grid-cols-4">
          <div className="col-span-1">
            <Earning actualValue={64320} oldValue={40000} />
          </div>
          <div className="col-span-1">
            <Customers actualValue={3209} oldValue={4100} />
          </div>
          <div className="col-span-1">
            <EmployeesRecruit actualValue={43} oldValue={39} />
          </div>
          <div className="col-span-1">
            <TotalOrders actualValue={5730} oldValue={7500} />
          </div>
        </div>

        {/* Second Row */}
        <div className="col-span-3 grid grid-cols-3">
          <div className="col-span-1">
            <Earning actualValue={1000} oldValue={200} />
          </div>
          <div className="col-span-1">
            <Earning actualValue={1000} oldValue={200} />
          </div>
          <div className="col-span-1">
            <Earning actualValue={1000} oldValue={200} />
          </div>
        </div>

        {/* Third Row */}
        <div className="col-span-2 grid grid-cols-2">
          <div className="col-span-1">
            <Earning actualValue={1000} oldValue={200} />
          </div>
          <div className="col-span-1">
            <Earning actualValue={1000} oldValue={200} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
