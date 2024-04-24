import { Request, Response } from "express";
import { db } from "../config/db";
import { validationResult } from "express-validator";
import {
  CustomRestaurantCustomersCount,
  CustomRestaurantDailyCustomersCount,
  CustomRestaurantHourlyCustomersCount,
  CustomRestaurantIncome,
} from "./types/adminTypes";

export async function restaurantIncomeFromOrders(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantID: number = parseInt(req.params.id as string);
    const total = await (
      db.order as unknown as CustomRestaurantIncome
    ).getRestaurantIncomeFromOrders(restaurantID);

    return res.status(200).json(total);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function restaurantCustomerCount(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantID: number = parseInt(req.params.id as string);
    const total = await (
      db.order as unknown as CustomRestaurantCustomersCount
    ).getRestaurantCustomerCount(restaurantID);

    return res.status(200).json(total);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function restaurantHourlyCustomersCount(
  req: Request,
  res: Response
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantID: number = parseInt(req.params.id as string);
    const total = await (
      db.order as unknown as CustomRestaurantHourlyCustomersCount
    ).getRestaurantHourlyCustomersCount(restaurantID);

    return res.status(200).json(total);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function restaurantDailyCustomersCount(
  req: Request,
  res: Response
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantID: number = parseInt(req.params.id as string);
    const total = await (
      db.order as unknown as CustomRestaurantDailyCustomersCount
    ).getRestaurantDailyCustomersCount(restaurantID);

    return res.status(200).json(total);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
