import express from "express";
import { router as restaurantRouter } from "./restaurant/router";
import { router as authRouter } from "./auth/router";
import { router as adminRouter } from "./admin/router";
export const router = express.Router();

router.use("/restaurants", restaurantRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
