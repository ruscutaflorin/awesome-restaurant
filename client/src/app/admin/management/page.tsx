import React from "react";
import RestaurantDetailsUI from "../../ui/adminPage/management/restaurantDetails/restaurantDetails";
import { Restaurant } from "@/app/types/types";
const restaurant: Restaurant = {
  id: 1,
  uuid: "restaurant123",
  name: "Tasty Grill",
  address: "456 Oak Street",
  location: "Townsville",
  businessHours: ["Monday-Friday: 9am-10pm", "Saturday-Sunday: 10am-11pm"],
  contact: "555-123-4567",
  ownerId: 123,
  createdAt: new Date("2024-04-19"),
  updatedAt: new Date("2024-04-19"),
};
const RestaurantDetails = () => {
  return <RestaurantDetailsUI restaurant={restaurant} />;
};

export default RestaurantDetails;
