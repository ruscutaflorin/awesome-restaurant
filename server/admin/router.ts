import express from "express";
import { auth } from "../auth/middleware/auth";
import { validateRestaurantId } from "./services/validation";
import {
  restaurantCustomerCount,
  restaurantDailyCustomersCount,
  restaurantHourlyCustomersCount,
  restaurantIncomeFromOrders,
} from "./views";

export const router = express.Router();
// router.use(auth);

router.get("/income/:id", validateRestaurantId, restaurantIncomeFromOrders);

router.get("/customers/:id", validateRestaurantId, restaurantCustomerCount);
router.get(
  "/hourly-activity/:id",
  validateRestaurantId,
  restaurantHourlyCustomersCount
);
router.get(
  "/daily-activity/:id",
  validateRestaurantId,
  restaurantDailyCustomersCount
);
