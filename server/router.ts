import express from "express";
import { router as restaurantRouter } from "./restaurant/router";
import { router as authRouter } from "./auth/router";
export const router = express.Router();

router.use("/restaurant", restaurantRouter);
router.use("/auth", authRouter);
