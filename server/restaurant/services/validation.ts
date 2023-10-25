import { check } from "express-validator";

export const validateRestaurant = [
  check("name").isString(),
  check("address").isString(),
  check("location").isString(),
  check("businessHours").isArray(),
  check("contact").optional().isString(),
  check("ownerId").isInt(),
];

export const validateDiningTable = [
  check("name").isString(),
  check("status").isString(),
  check("capacity").isInt(),
  check("positionX").isInt(),
  check("positionY").isInt(),
  check("restaurantId").isInt(),
];

export const validateReservation = [
  check("restaurantId").isInt(),
  check("tableId").isInt(),
  check("reservationDate").isISO8601(),
  check("numberOfGuests").isInt(),
  check("customerName").isString(),
  check("customerPhone").isString(),
  check("customerEmail").optional().isEmail(),
  check("reservationStatus").isString(),
];

export const validateOrder = [
  check("status").isString(),
  check("orderDate").isISO8601(),
  check("totalAmount").isFloat(),
  check("tableId").isInt(),
  check("userId").optional().isInt(),
];

export const validatePayment = [
  check("status").isString(),
  check("method").isString(),
  check("transactionId").optional().isString(),
  check("orderId").isInt(),
];

export const validateCategory = [
  check("name").isString(),
  check("restaurantId").isInt(),
];

export const validateProduct = [
  check("name").isString(),
  check("description").isString(),
  check("price").isFloat(),
  check("basePrice").isFloat(),
  check("ingredients").isArray(),
  check("availability").isBoolean(),
  check("categoryId").isInt(),
];

export const validateStaffUser = [
  check("name").isString(),
  check("role").isString(),
  check("userId").isInt(),
  check("restaurantId").isInt(),
];

export const validatePermission = [
  check("name").isString(),
  check("code").isString(),
];
export const validateUser = [
  check("name").isString(),
  check("email").isEmail(),
  check("password").isString().isLength({ min: 6 }),
];

export const validateReview = [
  check("userId").isInt(),
  check("restaurantId").isInt(),
  check("productId").isInt(),
  check("rating").isInt(),
  check("reviewText").optional().isString(),
];

export const validateOrderItem = [
  check("orderId").isInt(),
  check("productId").isInt(),
  check("quantity").isInt(),
  check("diningTableId").optional().isInt(),
];

export const validateGetClosestReservation = [check("tableId").isNumeric()];
