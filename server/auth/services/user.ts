import { Prisma, Restaurant } from "@prisma/client";
import { db } from "../../config/db";
import bcrypt from "bcrypt";
import { AuthenticationError, AuthorizationError } from "../errors";
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
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        restaurants: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      throw new AuthenticationError();
    }
    const comparePassword = await bcrypt.compare(userPassword, user.password);
    if (!comparePassword) {
      throw new AuthenticationError();
    }
    let token = createToken(user.id);
    let decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken || (decodedToken as any).exp * 1000 < Date.now()) {
      token = createToken(user.id);
      decodedToken = jwt.verify(token, JWT_SECRET);
    }

    const restaurantId = user.restaurants[0].id;
    return {
      ...user,
      restaurantId: restaurantId,
      token,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addRestaurantToUser = async (
  name: string,
  address: string,
  location: string,
  businessHours: string[],
  contact: string,
  username: string,
  email: string,
  password: string
): Promise<Restaurant> => {
  try {
    // Register the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await db.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    // Use the registered user's ID as the ownerId
    const restaurant = await db.restaurant.create({
      data: {
        name,
        address,
        location,
        businessHours,
        contact,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return restaurant;
  } catch (error) {
    throw error;
  }
};

export const addStaffToRestaurant = async (
  restaurantId: number,
  name: string,
  email: string,
  password: string,
  role: string,
  permissions: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await db.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
      },
    });
    // tie this user to the restaurant as a staff
    const staff = await db.staffUser.create({
      data: {
        role,
        name,
        user: {
          connect: {
            id: user.id,
          },
        },
        restaurant: {
          connect: {
            id: restaurantId,
          },
        },
      },
    });
    return staff;
  } catch (error) {
    throw error;
  }
};

const createToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};
