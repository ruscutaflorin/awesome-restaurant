import React from "react";
import Earning from "./earning";
import TotalOrders from "./totalOrders";
import Customers from "./customers";
import EmployeesRecruit from "./employeesRecruit";
import PopularTime from "./popularTime";
import PieChartComponent from "./pieChart";
import PaymentPieChart from "./paymentPie";
import RevenueLines from "./revenueLines";

const AdminDashboard = () => {
  return (
    <div className="grid-container grid-cols-4 gap-4">
      {/* First Row */}
      <div className="col-span-4 grid grid-cols-4">
        <div className="col-span-1 grid-item">
          <Earning actualValue={64320} oldValue={40000} />
        </div>
        <div className="col-span-1 grid-item">
          <Customers actualValue={3209} oldValue={4100} />
        </div>
        <div className="col-span-1 grid-item">
          <EmployeesRecruit actualValue={43} oldValue={39} />
        </div>
        <div className="col-span-1 grid-item">
          <TotalOrders actualValue={5730} oldValue={7500} />
        </div>
      </div>

      {/* Second Row */}
      <div className="col-span-3 grid gap-10 grid-cols-3 m-5">
        <div className="col-span-1 grid-item">
          <PopularTime />
        </div>
        <div className="col-span-1 grid-item">
          <PieChartComponent />
        </div>
        <div className="col-span-1 grid-item">
          <PaymentPieChart />
        </div>
      </div>

      {/* Third Row */}
      <div className="col-span-2 grid grid-cols-2">
        <div className="col-span-1 grid-item">
          <RevenueLines />
        </div>
        <div className="col-span-1 grid-item">
          <Earning actualValue={1000} oldValue={200} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;