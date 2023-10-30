import { Prisma } from "@prisma/client";
import { db } from "../../config/db";
import bcrypt from "bcrypt";
import { AuthenticationError } from "../errors";
const saltRounds = 10;

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
    return userData;
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
    return foundUser;
  } catch (err) {
    throw err;
  }
};
