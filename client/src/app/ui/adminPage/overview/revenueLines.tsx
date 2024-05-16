import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { DAILY_HOURS } from "@/lib/utils/constants";

type RevenueLinesProps = {
  hourlyCustomers: number[];
};

const RevenueLines = ({ hourlyCustomers }: RevenueLinesProps) => {
  const chartData = hourlyCustomers;
  const xLabels = DAILY_HOURS;
  return (
    <div className="bg-slate-800 h-full w-full flex justify-center items-center rounded-xl">
      {chartData.length > 0 && (
        <BarChart
          yAxis={[{ scaleType: "band", data: xLabels }]}
          series={[{ data: chartData, type: "bar", color: "white" }]}
          layout="horizontal"
          width={400}
          height={350}
        />
      )}
    </div>
  );
};

export default RevenueLines;
