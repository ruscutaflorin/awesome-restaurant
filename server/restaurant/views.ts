import { Request, Response } from "express";
import { listRestaurants } from "./services/restaurant";
import { validationResult } from "express-validator";
import { db } from "../config/db";
import {
  CustomDiningTable,
  CustomRestaurantDetails,
  Restaurant,
  RestaurantDetails,
} from "./types/restaurant";

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

    const reservation: Restaurant | string = await (
      db.diningTable as unknown as CustomDiningTable
    ).getNextReservation(tableId);

    if (typeof reservation === "string") {
      return res.status(404).json({ message: `${reservation}` });
    }
    return res.status(200).json(reservation);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(req.query.id as string);

    console.log(id);
    const restaurant: RestaurantDetails | string = await (
      db.restaurant as unknown as CustomRestaurantDetails
    ).getRestaurantById(id);
    console.log(restaurant);
    if (typeof restaurant === "string") {
      return res.status(404).json({ message: `${restaurant}` });
    }

    return res.status(200).json(restaurant);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
