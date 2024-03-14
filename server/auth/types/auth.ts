import { JwtPayload, Secret } from "jsonwebtoken";
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  process.exit(1);
}

export const SECRET_KEY: Secret = process.env.JWT_SECRET;

export type CustomRequest = Request & {
  token: string | JwtPayload;
};
