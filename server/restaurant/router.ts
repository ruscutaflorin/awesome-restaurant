import express from "express";
import { auth } from "../auth/middleware/auth";
import {
  getClosestReservationForTableId,
  getRestaurantById,
  getRestaurantCategories,
  getRestaurants,
  getRestaurantsPaginated,
  postRestaurant,
} from "./views";
import {
  validateGetClosestReservation,
  validateGetPaginatedRestaurants,
  validateGetRestaurantById,
} from "./services/validation";

export const router = express.Router();

// router.use(auth);
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
router.get("/:uuid/categories", getRestaurantCategories);
router.post("/add", postRestaurant);
