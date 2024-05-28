import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import React from "react";

const Customers = ({
  actualValue,
  oldValue,
}: {
  actualValue: number;
  oldValue: number;
}) => {
  const upFromLastMonth = ((actualValue - oldValue) * 100) / oldValue;
  const color = upFromLastMonth > 0 ? "text-green-500" : "text-red-500";

  return (
    <main className="flex flex-col items-center mx-5 bg-veryPaleGrey rounded-xl p-4">
      <h5 className="text-black text-lg mb-2">Customers</h5>
      <h2 className="text-black text-2xl mb-2">{`€${actualValue}`}</h2>
      <h6 className="text-sm flex items-center">
        {upFromLastMonth > 0 ? (
          <span className={`mr-1 ${color}`}>
            <TriangleUpIcon className="w-4 h-4" />
          </span>
        ) : (
          <span className={`mr-1 ${color}`}>
            <TriangleDownIcon className="w-4 h-4" />
          </span>
        )}
        <span className={color}>
          {upFromLastMonth > 0
            ? `${upFromLastMonth.toFixed(1)}%`
            : `${Math.abs(upFromLastMonth).toFixed(1)}%`}
        </span>
        <span className="text-black">from last month</span>
      </h6>
    </main>
  );
};

export default Customers;
