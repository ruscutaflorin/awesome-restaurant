import { Request, Response } from "express";
import { listRestaurants } from "./services/restaurant.service";
import { db } from "../config/db.server";

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
    const reservation = await (
      db.diningTable as unknown as any
    ).getNextReservation(5);
    if (reservation) {
      return res.status(200).json(reservation);
    } else {
      return res.status(404).json({ message: "No reservations found" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// export async function x(req: Request, res: Response) {
//   try {
//
//     // 1. Create User
//     // a. validari pt creare userului
//     // 2. Preferinte User
//   } catch (err) {
//     console.log(err);
//     res.status(500);
//   }
// }
// viewul contine partea de resp si service-ul care da date.
// service = functie de bussiness logic
