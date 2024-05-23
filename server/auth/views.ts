import { Request, Response } from "express";
import {
  addRestaurantToUser,
  addStaffToRestaurant,
  loginService,
  registerService,
} from "./services/user";
import { validationResult } from "express-validator";

export async function loginView(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);

    return res.status(501).json(err.message);
  }
}

export async function registerView(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const user = await registerService(userData);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(501).json(err.message);
  }
}

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      address,
      location,
      businessHours,
      contact,
      username,
      email,
      password,
    } = req.body;

    const restaurant = await addRestaurantToUser(
      name,
      address,
      location,
      businessHours,
      contact,
      username,
      email,
      password
    );

    return res.status(200).json(restaurant);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createStaffUser = async (req: Request, res: Response) => {
  try {
    const { restaurantId, name, email, password, role, permissions } = req.body;
    const user = await addStaffToRestaurant(
      restaurantId,
      name,
      email,
      password,
      role,
      permissions
    );
    return res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
