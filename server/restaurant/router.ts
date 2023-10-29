import express from "express";
import { getClosestReservation, getRestaurants } from "./views";
import { validateGetClosestReservation } from "./services/validation";

export const router = express.Router();

router.get("", getRestaurants);
router.get(
  "/getClosestReservationForTable",
  validateGetClosestReservation,
  getClosestReservation
);
