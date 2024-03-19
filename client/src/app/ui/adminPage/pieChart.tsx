import React from "react";
import { PieChart } from "@mui/x-charts";
const uData = [
  { label: "Page A", value: 4000 },
  { label: "Page B", value: 3000 },
  { label: "Page C", value: 2000 },
  { label: "Page D", value: 2780 },
  { label: "Page E", value: 1890 },
  { label: "Page F", value: 2390 },
  { label: "Page G", value: 3490 },
];

const PieChartComponent = () => {
  return (
    <div className="bg-slate-800 h-full">
      <PieChart
        series={[
          {
            data: uData,
            innerRadius: 29,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 180,
            cx: 100,
            cy: 150,
          },
        ]}
      />
    </div>
  );
};

export default PieChartComponent;
