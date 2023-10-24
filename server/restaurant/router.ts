import express from "express";
import { getClosestReservation, getRestaurants } from "./views";

export const router = express.Router();

router.get("", getRestaurants);
router.get("/getClosestReservation", getClosestReservation);
