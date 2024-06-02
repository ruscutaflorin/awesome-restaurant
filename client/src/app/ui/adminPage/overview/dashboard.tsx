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
import { useAuthStore } from "@/app/store/user";
import { boolean } from "zod";
import { CircularProgress } from "@mui/material";
const AdminDashboard = () => {
  const [earning, setEarning] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [hourlyCustomers, setHourlyCustomers] = useState<number[]>([]);
  const [dailyCustomers, setDailyCustomers] = useState<number[]>([]);
  const [popularItems, setPopularItems] = useState<[]>([]);
  const [reviews, setReviews] = useState<{}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantId && token) {
        try {
          setLoading(true);
          const income = await restaurantIncome(restaurantId, token);
          const customers = await restaurantCustomers(restaurantId, token);
          const hourlyCustomers = await restaurantHourlyCustomers(
            restaurantId,
            token
          );
          const dailyCustomers = await restaurantDailyCustomers(
            restaurantId,
            token
          );
          const popularItems = await restaurantMostOrderedItems(
            restaurantId,
            5,
            token
          );
          const reviewsInfo = await restaurantReviews(restaurantId, token);
          setEarning(income);
          setCustomers(customers);
          setHourlyCustomers(hourlyCustomers);
          setDailyCustomers(dailyCustomers);
          setPopularItems(popularItems);
          setReviews(reviewsInfo);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [restaurantId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main className="h-full flex justify-center items-center">
      <div className="grid-container grid-cols-2 gap-4 ">
        <div className="col-span-3 grid gap-10 grid-cols-3 mx-5">
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

        {/* Second Row */}
        <div className="col-span-3 grid grid-cols-3 mx-5 mt-5">
          <div className="col-span-1 grid-item flex flex-col items-center justify-center">
            <Earning actualValue={earning} oldValue={40000} />
            <Customers actualValue={customers} oldValue={4100} />
          </div>
          <div className="col-span-2 col-start-2 grid-item mb-5">
            <RevenueLines hourlyCustomers={hourlyCustomers} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
