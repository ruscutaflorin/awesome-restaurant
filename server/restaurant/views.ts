import { Request, Response } from "express";
import { listRestaurants } from "./services/restaurant";
import { check, validationResult } from "express-validator";
import { db } from "../config/db";

export async function getRestaurants(req: Request, res: Response) {
  try {
    const restaurants = await listRestaurants();
    return res.status(200).json(restaurants);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export async function getClosestReservation(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const tableId: number = parseInt(req.query.tableId as string);

    const reservation = await (
      db.diningTable as unknown as any
    ).getNextReservation(tableId);
    if (!reservation) {
      return res.status(404).json({ message: "No reservations found" });
    }
    return res.status(200).json(reservation);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
