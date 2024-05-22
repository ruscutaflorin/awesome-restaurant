import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { DAILY_HOURS } from "@/lib/utils/constants";

type RevenueLinesProps = {
  hourlyCustomers?: number[]; // Marking as optional to handle undefined case
};

const RevenueLines = ({ hourlyCustomers = [] }: RevenueLinesProps) => {
  // Providing a default value of empty array
  const chartData = hourlyCustomers;
  const xLabels = DAILY_HOURS;

  return (
    <div className="bg-veryPaleGrey h-full w-full flex justify-center items-center rounded-xl p-6 shadow-lg">
      {chartData.length > 0 ? (
        <BarChart
          yAxis={[{ scaleType: "band", data: xLabels }]}
          series={[
            {
              type: "bar",
              label: "Popular Time",
              data: chartData,
              color: "#02B2AF",
            },
          ]}
          layout="horizontal"
          width={400}
          height={350}
        />
      ) : (
        <p>No data available</p> // Fallback when there's no data
      )}
    </div>
  );
};

export default RevenueLines;
