import React from "react";
import ModifyCategory from "@/app/ui/adminPage/management/category/modifyCategory";
import { Category } from "@/app/types/types";
const categories: Category[] = [
  {
    id: 1,
    name: "Appetizers",
    restaurantId: 123,
    createdAt: new Date("2024-04-19"),
    updatedAt: new Date("2024-04-19"),
  },
  {
    id: 2,
    name: "Main Course",
    restaurantId: 123,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: 3,
    name: "Desserts",
    restaurantId: 123,
    createdAt: new Date("2024-04-21"),
    updatedAt: new Date("2024-04-21"),
  },
  {
    id: 4,
    name: "Beverages",
    restaurantId: 123,
    createdAt: new Date("2024-04-22"),
    updatedAt: new Date("2024-04-22"),
  },
  {
    id: 5,
    name: "Specials",
    restaurantId: 123,
    createdAt: new Date("2024-04-23"),
    updatedAt: new Date("2024-04-23"),
  },
];
const Categorys = () => {
  return (
    <div>
      <ModifyCategory categories={categories} />
    </div>
  );
};

export default Categorys;
