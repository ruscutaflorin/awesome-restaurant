import express from "express";
import { auth } from "../auth/middleware/auth";
import { validateIncomeOfRestaurant } from "./services/validation";
import { restaurantIncomeFromOrders } from "./views";

export const router = express.Router();
// router.use(auth);

router.get(
  "/income/:id",
  validateIncomeOfRestaurant,
  restaurantIncomeFromOrders
);
