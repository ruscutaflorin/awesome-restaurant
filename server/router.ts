import express from "express";
import { router as restaurantRouter } from "./restaurant/router";
export const router = express.Router();

router.use("/restaurant", restaurantRouter);
