import express from "express";
import { auth } from "../auth/middleware/auth";
import {
  validateRestaurantAndLimit,
  validateRestaurantId,
} from "./services/validation";
import {
  addRestaurantCategory,
  addRestaurantProduct,
  addRestaurantReservation,
  addRestaurantStaffUser,
  addRestaurantTable,
  restaurantCategories,
  restaurantCustomerCount,
  restaurantDailyCustomersCount,
  restaurantDetails,
  restaurantDiningTables,
  restaurantHourlyCustomersCount,
  restaurantIncomeFromOrders,
  restaurantMostOrderedItems,
  restaurantOrders,
  restaurantProducts,
  restaurantReservations,
  restaurantReviews,
  restaurantStaffUsers,
  editRestaurantCategory,
  editRestaurantDiningTable,
  editRestaurantProduct,
  editRestaurantReservation,
  editRestaurantStaffUser,
  editRestaurantDetails,
} from "./views";

export const router = express.Router();
router.use(auth);

router.get("/income/:id", validateRestaurantId, restaurantIncomeFromOrders);

router.get("/customers/:id", validateRestaurantId, restaurantCustomerCount);
router.get(
  "/hourly-activity/:id",
  validateRestaurantId,
  restaurantHourlyCustomersCount
);
router.get(
  "/daily-activity/:id",
  validateRestaurantId,
  restaurantDailyCustomersCount
);

router.get("/popular", validateRestaurantAndLimit, restaurantMostOrderedItems);
router.get("/reviews/:id", validateRestaurantId, restaurantReviews);
router.get("/categories/:id", validateRestaurantId, restaurantCategories);
router.get("/tables/:id", validateRestaurantId, restaurantDiningTables);
router.get("/orders/:id", validateRestaurantId, restaurantOrders);
router.get("/products/:id", validateRestaurantId, restaurantProducts);
router.get("/reservations/:id", validateRestaurantId, restaurantReservations);
router.get("/restaurant/:id", validateRestaurantId, restaurantDetails);
router.get("/staff/:id", validateRestaurantId, restaurantStaffUsers);

router.post("/add-category/", addRestaurantCategory);
router.post("/add-table/", addRestaurantTable);
router.post("/add-reservation/", addRestaurantReservation);
router.post("/add-staff/", addRestaurantStaffUser);
router.post("/add-product/", addRestaurantProduct);
router.put("/edit-category/", editRestaurantCategory);
router.put("/edit-table/", editRestaurantDiningTable);
router.put("/edit-product/", editRestaurantProduct);
router.put("/edit-reservation/", editRestaurantReservation);
router.put("/edit-staff/", editRestaurantStaffUser);
router.put("/edit-restaurant/", editRestaurantDetails);
