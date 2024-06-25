import express from "express";
import {
  addOrderToRestaurant,
  getClosestReservationForTableId,
  getRestaurantById,
  getRestaurantCategories,
  getRestaurants,
  getRestaurantsPaginated,
  getReviewSentiment,
  postProductReview,
  postRestaurant,
  restaurantReviews,
} from "./views";
import {
  validateGetClosestReservation,
  validateGetPaginatedRestaurants,
  validateGetRestaurantById,
} from "./services/validation";

export const router = express.Router();

router.get(
  "/paginate",
  validateGetPaginatedRestaurants,
  getRestaurantsPaginated
);
router.get("", getRestaurants);
router.get(
  "/tables/:id",
  validateGetClosestReservation,
  getClosestReservationForTableId
);
router.get("/:uuid", validateGetRestaurantById, getRestaurantById);
router.get("/:uuid/categories", getRestaurantCategories);
router.post("/add", postRestaurant);
router.post("/add-order", addOrderToRestaurant);

router.get("/reviews/:id", restaurantReviews);
router.post("/add-review", postProductReview);

router.post("/sentiment-analysis", getReviewSentiment);
