import express from "express";
import {
  getClosestReservationForTableId,
  getRestaurantById,
  getRestaurants,
  getRestaurantsPaginated,
} from "./views";
import {
  validateGetClosestReservation,
  validateGetPaginatedRestaurants,
  validateGetRestaurantById,
} from "./services/validation";

export const router = express.Router();

router.get(
  "/paginate",
  validateGetPaginatedRestaurants,
  getRestaurantsPaginated
);
router.get("", getRestaurants);
router.get(
  "/tables/:id",
  validateGetClosestReservation,
  getClosestReservationForTableId
);
router.get("/:uuid", validateGetRestaurantById, getRestaurantById);
