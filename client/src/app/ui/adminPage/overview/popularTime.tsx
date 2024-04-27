import { WEEK_DAYS } from "@/lib/utils/constants";
import { BarChart } from "@mui/x-charts";
import React from "react";

type PopularTimeProps = {
  customersByDay: number[];
};

const PopularTime = ({ customersByDay }: PopularTimeProps) => {
  const uData = customersByDay;
  const xLabels = WEEK_DAYS;

  return (
    <div className="bg-slate-800  flex justify-center items-center rounded-xl">
      {uData.length > 0 && (
        <BarChart
          width={500}
          height={300}
          series={[{ data: uData, type: "bar" }]}
          xAxis={[{ scaleType: "band", data: xLabels }]}
        />
      )}
    </div>
  );
};

export default PopularTime;
