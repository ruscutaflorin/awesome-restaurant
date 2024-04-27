import React from "react";
import { PieChart } from "@mui/x-charts";

type PieChartProps = {
  popularItems: { name: string; quantity: number; productId: number }[];
};
const PieChartComponent = ({ popularItems }: PieChartProps) => {
  const uData = popularItems.map((item) => ({
    label: item.name,
    value: item.quantity,
  }));
  return (
    <div className="bg-slate-800 flex justify-center items-center rounded-xl ">
      {uData.length > 0 && (
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
      )}
    </div>
  );
};

export default PieChartComponent;
