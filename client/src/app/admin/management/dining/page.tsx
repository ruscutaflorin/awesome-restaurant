"use client";
import { restaurantDiningTables } from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";
import { DiningTable } from "@/app/types/types";
import DiningTableForm from "@/app/ui/adminPage/management/dinningTables/DiningTableForm";
import DisplayDiningTables from "@/app/ui/adminPage/management/dinningTables/DiningTables";
import React, { useEffect, useState } from "react";

const DiningTables = () => {
  const [tables, setTables] = useState<DiningTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const token = useAuthStore((state) => state.token);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        if (restaurantId && token) {
          const tables = await restaurantDiningTables(restaurantId, token);
          setTables(tables);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tables:", error);
        setLoading(false);
      }
    };
    fetchTables();
  }, [restaurantId, token]);
  return (
    <div className="flex flex-row justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {isFormVisible && (
            <DiningTableForm
              diningTables={tables}
              onClose={toggleFormVisibility}
            />
          )}
          <DisplayDiningTables tables={tables} />
        </div>
      )}
    </div>
  );
};

export default DiningTables;
