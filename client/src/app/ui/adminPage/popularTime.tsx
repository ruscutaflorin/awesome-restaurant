import { BarChart } from "@mui/x-charts";
import React from "react";

const PopularTime = () => {
  // Sample data for popular hours
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  return (
    <div className="bg-slate-800 h-full w-full flex justify-center items-center rounded-xl">
      <h2 className="text-white ml-3">Popular Time</h2>
      <BarChart
        width={500}
        height={300}
        series={[{ data: uData, type: "bar" }]}
        xAxis={[{ scaleType: "band", data: xLabels }]}
      ></BarChart>
    </div>
  );
};

export default PopularTime;
