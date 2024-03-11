import { Prisma } from "@prisma/client";
import { db } from "../../config/db";
import bcrypt from "bcrypt";
import { AuthenticationError } from "../errors";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const saltRounds = 10;

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const registerService = async (user: Prisma.UserCreateInput) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const userSecure = { ...user, password: hashedPassword };

    const userData = await db.user.create({
      data: userSecure,
      // include: {
      //   orders: true,
      //   reviews: true,
      //   restaurants: true,
      // },
    });
    const token = createToken(userData.id);
    return { userData, token };
  } catch (err) {
    throw err;
  }
};

export const loginService = async (userEmail: string, userPassword: string) => {
  try {
    const foundUser = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!foundUser) {
      throw new AuthenticationError();
    }
    const comparePassword = await bcrypt.compare(
      userPassword,
      foundUser.password
    );
    if (!comparePassword) {
      throw new AuthenticationError();
    }
    const token = createToken(foundUser.id);
    return { foundUser, token };
  } catch (err) {
    throw err;
  }
};

const createToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
};
