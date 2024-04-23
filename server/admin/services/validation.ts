import { check } from "express-validator";

export const validateIncomeOfRestaurant = [check("id").isInt()];
