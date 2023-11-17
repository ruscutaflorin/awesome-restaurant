import express from "express";
import {
  getClosestReservation,
  getRestaurantById,
  getRestaurants,
} from "./views";
import {
  validateGetClosestReservation,
  validateGetRestaurantById,
} from "./services/validation";

export const router = express.Router();

router.get("", getRestaurants);
router.get("/tables/:id", validateGetClosestReservation, getClosestReservation);
router.get("/:id", validateGetRestaurantById, getRestaurantById);
