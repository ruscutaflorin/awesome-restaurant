import { Request, Response } from "express";
import { db } from "../config/db";
import { validationResult } from "express-validator";
import {
  CustomRestaurantCategories,
  CustomRestaurantCustomersCount,
  CustomRestaurantDailyCustomersCount,
  CustomRestaurantDetails,
  CustomRestaurantDiningTables,
  CustomRestaurantHourlyCustomersCount,
  CustomRestaurantIncome,
  CustomRestaurantMostPopularItems,
  CustomRestaurantOrders,
  CustomRestaurantProducts,
  CustomRestaurantReservations,
  CustomRestaurantReviews,
  CustomRestaurantStaffUsers,
} from "./types/adminTypes";
import {
  addCategory,
  addDiningTable,
  addProduct,
  addReservation,
  addStaffUser,
  editCategory,
  editDiningTable,
  editProduct,
  editReservation,
  editRestaurant,
  editStaffUser,
} from "./services/admin";

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

export const restaurantMostOrderedItems = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantID: number = parseInt(req.query.id as string);
    const limit: number = parseInt(req.query.limit as string);
    const result = await (
      db.orderItem as unknown as CustomRestaurantMostPopularItems
    ).getRestaurantMostPopularItems(restaurantID, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantReviews = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.review as unknown as CustomRestaurantReviews
    ).getRestaurantReviewsGroupedByRating(restaurantID);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantCategories = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.category as unknown as CustomRestaurantCategories
    ).getRestaurantCategories(restaurantID);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantDiningTables = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.diningTable as unknown as CustomRestaurantDiningTables
    ).getDiningTablesByRestaurantId(restaurantID);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantOrders = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.order as unknown as CustomRestaurantOrders
    ).getRestaurantOrders(restaurantID);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantProducts = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.product as unknown as CustomRestaurantProducts
    ).getRestaurantProducts(restaurantID);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantReservations = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.reservation as unknown as CustomRestaurantReservations
    ).getRestaurantReservations(restaurantID);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantDetails = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.restaurant as unknown as CustomRestaurantDetails
    ).getRestaurantDetails(restaurantID);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantStaffUsers = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurantID: number = parseInt(req.params.id as string);
    const result = await (
      db.staffUser as unknown as CustomRestaurantStaffUsers
    ).getRestaurantStaffUsers(restaurantID);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRestaurantCategory = async (req: Request, res: Response) => {
  try {
    const { id, category } = req.body;
    const result = addCategory(id, category);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRestaurantTable = async (req: Request, res: Response) => {
  try {
    const { id, name, capacity } = req.body;
    const result = addDiningTable(id, name, capacity);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRestaurantReservation = async (req: Request, res: Response) => {
  try {
    const { id, name, email, phone, date, persons } = req.body;
    const result = addReservation(id, name, email, phone, date, persons);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRestaurantStaffUser = async (req: Request, res: Response) => {
  try {
    const { id, restaurantId, name, role } = req.body;
    const result = addStaffUser(id, restaurantId, name, role);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRestaurantProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      basePrice,
      categoryID,
      ingredients,
      availability,
    } = req.body;
    const result = addProduct(
      name,
      description,
      price,
      basePrice,
      categoryID,
      ingredients,
      availability
    );
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantCategory = async (req: Request, res: Response) => {
  try {
    const { restaurantId, id, category } = req.body;
    const result = editCategory(restaurantId, id, category);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantDiningTable = async (
  req: Request,
  res: Response
) => {
  try {
    const { restaurantId, id, name, capacity } = req.body;
    console.log(restaurantId, id, name, capacity);
    const result = await editDiningTable(restaurantId, id, name, capacity);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantProduct = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      description,
      price,
      basePrice,
      categoryID,
      ingredients,
      availability,
    } = req.body;
    const result = await editProduct(
      id,
      name,
      description,
      price,
      basePrice,
      categoryID,
      ingredients,
      availability
    );
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantReservation = async (
  req: Request,
  res: Response
) => {
  try {
    const { restaurantId, id, name, email, phone, date, persons } = req.body;
    const result = editReservation(
      restaurantId,
      id,
      name,
      email,
      phone,
      date,
      persons
    );
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantStaffUser = async (req: Request, res: Response) => {
  try {
    const { restaurantId, id, name, role } = req.body;
    const result = editStaffUser(restaurantId, id, name, role);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const { id, name, address, location, businessHours, contact } = req.body;
    const result = await editRestaurant(
      id,
      name,
      address,
      location,
      businessHours,
      contact
    );
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
