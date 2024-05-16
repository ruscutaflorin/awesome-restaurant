import { Request, Response } from "express";
import { listRestaurants } from "./services/restaurant";
import { validationResult } from "express-validator";
import { db } from "../config/db";
import {
  CustomDiningTable,
  CustomPaginatedRestaurant,
  CustomRestaurantCategories,
  CustomRestaurantDetailed,
  CustomSearchPaginatedRestaurant,
  Restaurant,
  RestaurantDetailed,
} from "./types/types";
export async function getRestaurants(req: Request, res: Response) {
  try {
    const restaurants = await listRestaurants();
    return res.status(200).json(restaurants);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export async function getClosestReservationForTableId(
  req: Request,
  res: Response
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id as string);

    const reservation: Restaurant | string = await (
      db.diningTable as unknown as CustomDiningTable
    ).getNextReservationForTable(id);

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

    const uuid: string = req.params.uuid as string;

    const restaurant: RestaurantDetailed | string = await (
      db.restaurant as unknown as CustomRestaurantDetailed
    ).getRestaurantById(uuid);

    return res.status(200).json(restaurant);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export async function getRestaurantsPaginated(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    const query: string = req.query.query as string;
    if (query) {
      const data = await (
        db.restaurant as unknown as CustomSearchPaginatedRestaurant
      ).getSearchPaginatedRestaurants(offset, limit, query);
      return res.status(200).json(data);
    } else {
      const data = await (
        db.restaurant as unknown as CustomPaginatedRestaurant
      ).getPaginatedRestaurants(offset, limit);
      return res.status(200).json(data);
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export const getRestaurantCategories = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantUUID: string = req.params.uuid as string;

    const result = await (
      db.category as unknown as CustomRestaurantCategories
    ).getRestaurantCategoriesByUUID(restaurantUUID);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
