import express from "express";
import {
  getClosestReservation,
  getRestaurantById,
  getRestaurants,
} from "./views";
import { validateGetClosestReservation } from "./services/validation";

export const router = express.Router();

router.get("", getRestaurants);
router.get(
  "/getClosestReservationForTable",
  validateGetClosestReservation,
  getClosestReservation
);
router.get("/restaurants", getRestaurantById);
