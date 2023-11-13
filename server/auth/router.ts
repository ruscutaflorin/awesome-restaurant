import express from "express";
import { validateUser } from "../restaurant/services/validation";
import { loginView, registerView } from "./views";
export const router = express.Router();

router.post("/login", loginView);
router.post("/register", validateUser, registerView);
