import { DiningTable } from "@/app/types/types";
import ModifyDiningTables from "@/app/ui/adminPage/management/dinningTables/modifyDiningTables";
import React from "react";
const diningTables: DiningTable[] = [
  {
    id: 1,
    name: "Table 1",
    status: "Occupied",
    capacity: 4,
    positionX: 100,
    positionY: 150,
    restaurantId: 123,
    createdAt: new Date("2024-04-19"),
    updatedAt: new Date("2024-04-19"),
  },
  {
    id: 2,
    name: "Table 2",
    status: "Vacant",
    capacity: 6,
    positionX: 200,
    positionY: 250,
    restaurantId: 123,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: 3,
    name: "Table 3",
    status: "Vacant",
    capacity: 2,
    positionX: 300,
    positionY: 200,
    restaurantId: 123,
    createdAt: new Date("2024-04-21"),
    updatedAt: new Date("2024-04-21"),
  },
];

const DiningTables = () => {
  return (
    <div>
      <ModifyDiningTables diningTables={diningTables} />
    </div>
  );
};

export default DiningTables;
