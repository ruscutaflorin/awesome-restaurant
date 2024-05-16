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
import {
  restaurantCustomers,
  restaurantDailyCustomers,
  restaurantHourlyCustomers,
  restaurantIncome,
  restaurantMostOrderedItems,
  restaurantReviews,
} from "../../../api/admin";
const AdminDashboard = () => {
  const [earning, setEarning] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [hourlyCustomers, setHourlyCustomers] = useState<number[]>([]);
  const [dailyCustomers, setDailyCustomers] = useState<number[]>([]);
  const [popularItems, setPopularItems] = useState<[]>([]);
  const [reviews, setReviews] = useState<{}>({});
  useEffect(() => {
    const fetchData = async () => {
      const income = await restaurantIncome(1);
      const customers = await restaurantCustomers(1);
      const hourlyCustomers = await restaurantHourlyCustomers(1);
      const dailyCustomers = await restaurantDailyCustomers(1);
      const popularItems = await restaurantMostOrderedItems(1, 5);
      const reviwsInfo = await restaurantReviews(1);
      setEarning(income);
      setCustomers(customers);
      setHourlyCustomers(hourlyCustomers);
      setDailyCustomers(dailyCustomers);
      setPopularItems(popularItems);
      setReviews(reviwsInfo);
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
            <h1 className="flex text-white justify-center items-center">
              Customers by Day
            </h1>
            <PopularTime customersByDay={dailyCustomers} />
          </div>
          <div className="col-span-1 grid-item">
            <h1 className="flex text-white justify-center items-center">
              Most Ordered Products
            </h1>
            <PieChartComponent popularItems={popularItems} />
          </div>
          <div className="col-span-1 grid-item">
            <h1 className="flex text-white justify-center items-center">
              Reviews
            </h1>
            <PaymentPieChart reviews={reviews} />
          </div>
        </div>

        {/* Third Row */}
        <div className="col-span-2 grid grid-cols-2 mx-5 mt-5">
          <div className="col-span-1 grid-item">
            <h1 className="flex text-white justify-center items-center">
              Popular Time
            </h1>
            <RevenueLines hourlyCustomers={hourlyCustomers} />
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
