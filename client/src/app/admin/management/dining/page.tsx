"use client";
import { restaurantDiningTables } from "@/app/api/admin";
import { DiningTable } from "@/app/types/types";
import DiningTableForm from "@/app/ui/adminPage/management/dinningTables/DiningTableForm";
import DisplayDiningTables from "@/app/ui/adminPage/management/dinningTables/DiningTables";
import React, { useEffect, useState } from "react";

const DiningTables = () => {
  const [tables, setTables] = useState<DiningTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await restaurantDiningTables(1);
        setTables(tables);
        setLoading(false);
        console.log("asda");
      } catch (error) {
        console.error("Error fetching tables:", error);
        setLoading(false);
      }
    };
    fetchTables();
  }, []);
  return (
    <div className="flex flex-row justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <DisplayDiningTables tables={tables} />
          {isFormVisible && (
            <DiningTableForm
              diningTables={tables}
              onClose={toggleFormVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DiningTables;
