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
    <div className=" bg-slate-800 flex justify-center items-center rounded-xl">
      {reviews && (
        <PieChart
          series={[
            {
              data: data,
              cx: 150,
              cy: 150,
              innerRadius: 40,
              outerRadius: 80,
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

export default PaymentPieChart;
