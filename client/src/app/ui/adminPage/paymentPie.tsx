import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data2 = [
  { label: "Group A", value: 2400 },
  { label: "Group B", value: 4567 },
  { label: "Group C", value: 1398 },
  { label: "Group D", value: 9800 },
  { label: "Group E", value: 3908 },
  { label: "Group F", value: 4800 },
];

const PaymentPieChart = () => {
  return (
    <div className=" bg-slate-800 m-0 p-0">
      <PieChart
        series={[
          {
            data: data2,
            cx: 100,
            cy: 150,
            innerRadius: 40,
            outerRadius: 80,
          },
        ]}
        height={300}
        slotProps={{
          legend: { hidden: false },
        }}
      />
    </div>
  );
};

export default PaymentPieChart;
