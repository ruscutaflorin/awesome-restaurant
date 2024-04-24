"use client";

import React, { useEffect, useState } from "react";
import Earning from "./earning";
import TotalOrders from "./totalOrders";
import Customers from "./customers";
import EmployeesRecruit from "./employeesRecruit";
import PopularTime from "./popularTime";
import PieChartComponent from "./pieChart";
import PaymentPieChart from "./paymentPie";
import RevenueLines from "./revenueLines";
import { restaurantCustomers, restaurantIncome } from "../../../api/admin";
const AdminDashboard = () => {
  const [earning, setEarning] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const income = await restaurantIncome(1);
      const customers = await restaurantCustomers(1);
      setEarning(income);
      setCustomers(customers);
    };
    fetchData();
  }, []);
  return (
    <main className="h-full flex justify-center items-center">
      <div className="grid-container grid-cols-4 gap-4 ">
        {/* First Row */}
        <div className="col-span-4 grid grid-cols-2">
          <div className="col-span-1 grid-item">
            <Earning actualValue={earning} oldValue={40000} />
          </div>
          <div className="col-span-1 grid-item">
            <Customers actualValue={customers} oldValue={4100} />
          </div>
        </div>

        {/* Second Row */}
        <div className="col-span-3 grid gap-10 grid-cols-3 mx-5 mt-5">
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
        <div className="col-span-2 grid grid-cols-2 mx-5 mt-5">
          <div className="col-span-1 grid-item">
            <RevenueLines />
          </div>
          <div className=" grid-col-span-2 grid grid-cols-1 my-auto gap-5">
            <div className="col-span-1 grid-item">
              <Earning actualValue={1000} oldValue={200} />
            </div>
            <div className="col-span-1 grid-item">
              <Earning actualValue={1000} oldValue={200} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
