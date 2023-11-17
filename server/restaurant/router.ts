import express from "express";
import {
  getClosestReservationForTableId,
  getRestaurantById,
  getRestaurants,
} from "./views";
import {
  validateGetClosestReservation,
  validateGetRestaurantById,
} from "./services/validation";

export const router = express.Router();

router.get("", getRestaurants);
router.get(
  "/tables/:id",
  validateGetClosestReservation,
  getClosestReservationForTableId
);
router.get("/:uuid", validateGetRestaurantById, getRestaurantById);
