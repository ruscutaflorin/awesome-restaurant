import { check } from "express-validator";

export const validateRestaurantId = [check("id").isInt()];
