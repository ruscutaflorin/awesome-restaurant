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
    <main className="flex flex-col items-center w-11/12 mx-5 bg-veryPaleGrey rounded-xl p-4">
      <h5 className="text-black text-lg mb-2">Customers</h5>
      <h2 className="text-black text-2xl mb-2">{`${actualValue}`}</h2>
    </main>
  );
};

export default Customers;
