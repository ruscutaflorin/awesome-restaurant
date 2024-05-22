import { WEEK_DAYS } from "@/lib/utils/constants";
import { BarChart } from "@mui/x-charts";
import React from "react";

type PopularTimeProps = {
  customersByDay?: number[]; // Marking as optional to handle undefined case
};

const PopularTime = ({ customersByDay = [] }: PopularTimeProps) => {
  // Providing a default value of empty array
  const uData = customersByDay;
  const xLabels = WEEK_DAYS;

  return (
    <div className="bg-veryPaleGrey flex justify-center items-center rounded-xl p-6 shadow-lg">
      {uData?.length > 0 ? (
        <BarChart
          width={500}
          height={300}
          series={[{ data: uData, label: "Daily Customers", type: "bar" }]}
          xAxis={[{ scaleType: "band", data: xLabels }]}
        />
      ) : (
        <p>No data available</p> // Fallback when there's no data
      )}
    </div>
  );
};

export default PopularTime;
