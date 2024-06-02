import { Request, Response } from "express";
import {
  createOrder,
  listRestaurants,
  getProductRatingsBasedOnRestaurant,
  addProductReview,
} from "./services/restaurant";
import { validationResult } from "express-validator";
import { db } from "../config/db";
import {
  CustomAddRestaurant,
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

export const postRestaurant = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, address, location, businessHours, contact, ownerId } =
      req.body;

    const restaurant: Restaurant = await (
      db.restaurant as unknown as CustomAddRestaurant
    ).addRestaurant(name, address, location, businessHours, contact, ownerId);

    return res.status(200).json(restaurant);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addOrderToRestaurant = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { restaurantId, orderItems, totalPrice, paymentStatus } = req.body;

    const restaurant = await createOrder(
      restaurantId,
      orderItems,
      totalPrice,
      paymentStatus
    );

    return res.status(200).json(restaurant);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const restaurantReviews = async (req: Request, res: Response) => {
  try {
    const restaurantId: number = parseInt(req.params.id as string);
    const reviews = await getProductRatingsBasedOnRestaurant(restaurantId);
    return res.status(200).json(reviews);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

import path from "path";
import { spawn } from "child_process";
import { addProduct } from "../admin/services/admin";

export const performSentimentAnalysis = async (req: Request, res: Response) => {
  try {
    const { review } = req.body;
    const pythonScriptPath = path.join(
      "C:",
      "Users",
      "FLORIN",
      "Desktop",
      "stuff",
      "coding",
      "projects",
      "awesome-restaurant",
      "server",
      "restaurant-analysis",
      "sentiment_analysis.py"
    );

    // Spawn a new Python process to run the sentiment analysis script
    const pythonProcess = spawn("python", [pythonScriptPath, review]);
    let data = "";

    // Collect data from the Python script
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    // Handle errors from the Python script
    pythonProcess.stderr.on("data", (chunk) => {
      console.error(`stderr: ${chunk}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const parsedData = data;
          const sentimentMatch = parsedData.match(/Sentiment: (\d+)/);
          if (sentimentMatch) {
            const sentiment = sentimentMatch[1];
            res.status(200).json({ sentiment });
          } else {
            res.status(500).json({ error: "Failed to parse sentiment" });
          }
        } catch (error) {
          console.error("Error parsing JSON data from Python script:", error);
          console.error("Received data:", data);
          res.status(500).send("Error parsing data from sentiment analysis");
        }
      } else {
        console.error(`Python script exited with code ${code}`);
        res.status(500).send("Error occurred during sentiment analysis");
      }
    });
  } catch (error: any) {
    console.error("Error in performSentimentAnalysis:", error);
    return res.status(500).json(error.message);
  }
};

export const postProductReview = async (req: Request, res: Response) => {
  try {
    const { restaurantId, productId, sentiment, rating, reviewText } = req.body;
    console.log(restaurantId, productId, sentiment, rating, reviewText);
    const review = await addProductReview(
      restaurantId,
      productId,
      sentiment,
      rating,
      reviewText
    );

    return res.status(200).json(review);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
