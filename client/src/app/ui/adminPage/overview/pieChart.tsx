import React from "react";
import { PieChart } from "@mui/x-charts";

type PieChartProps = {
  popularItems?: { name: string; quantity: number; productId: number }[];
};

const PieChartComponent = ({ popularItems = [] }: PieChartProps) => {
  const uData = popularItems.map((item) => ({
    label: item.name,
    value: item.quantity,
  }));
  console.log(uData);
  return (
    <div className="bg-veryPaleGrey flex rounded-xl p-6 shadow-lg">
      {uData.length > 0 ? (
        <PieChart
          series={[
            {
              data: uData,
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 5,
              cornerRadius: 5,
              // startAngle: -90,
              // endAngle: 180,
              cx: 100,
              cy: 150,
            },
          ]}
          height={300}
          width={400}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              hidden: false,
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PieChartComponent;
