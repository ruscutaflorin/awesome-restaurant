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
    <div className="bg-slate-800 flex justify-center items-center rounded-xl ">
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
            cx: 150,
            cy: 150,
          },
        ]}
        height={300}
        width={300}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    </div>
  );
};

export default PieChartComponent;
