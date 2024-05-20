import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

type PaymentPieChartProps = {
  reviews: { [key: string]: number };
};
const PaymentPieChart = ({ reviews }: PaymentPieChartProps) => {
  const data = Object.keys(reviews).map((key) => ({
    label: key,
    value: reviews[key],
  }));
  return (
    <div className="bg-veryPaleGrey flex justify-center items-center rounded-xl p-6 shadow-lg">
      {reviews && (
        <PieChart
          series={[
            {
              data: data,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
              cx: 150,
              cy: 150,
              innerRadius: 40,
              outerRadius: 80,
            },
          ]}
          height={300}
          width={300}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
              hidden: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default PaymentPieChart;
