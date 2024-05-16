import { check } from "express-validator";

export const validateRestaurantId = [check("id").isInt()];

export const validateRestaurantAndLimit = validateRestaurantId.concat(
  check("limit").isInt()
);
