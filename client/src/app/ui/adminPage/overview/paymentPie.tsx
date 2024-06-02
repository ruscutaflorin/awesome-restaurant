import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

type PaymentPieChartProps = {
  reviews?: { [key: string]: number }; // Marking as optional to handle undefined case
};

const PaymentPieChart = ({ reviews = {} }: PaymentPieChartProps) => {
  const data = Object.keys(reviews).map((key) => ({
    label: key,
    value: reviews[key],
  }));

  return (
    <div className="bg-veryPaleGrey flex justify-center items-center rounded-xl p-6 shadow-lg">
      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 5,
              cornerRadius: 5,
              // startAngle: -90,
              // endAngle: 180,
              cx: 150,
              cy: 150,
            },
          ]}
          height={300}
          width={300}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
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

export default PaymentPieChart;
