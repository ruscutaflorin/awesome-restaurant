import { db } from "../../config/db";
import { Reservation, Restaurant, RestaurantDetailed } from "../types/types";

export const listRestaurants = async (): Promise<Restaurant[]> => {
  return db.restaurant.findMany({
    select: {
      id: true,
      uuid: true,
      name: true,
      address: true,
      location: true,
      businessHours: true,
      contact: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getRestaurantById = async (
  uuid: string
): Promise<RestaurantDetailed | string> => {
  const restaurant = await db.restaurant.findFirst({
    where: {
      uuid: uuid,
    },
    include: {
      reservations: true,
      categories: {
        include: { products: true },
      },
      reviews: true,
      diningTables: true,
    },
  });
  if (!restaurant) {
    return "The restaurant is not found!";
  }
  return restaurant;
};

export const nextReservationForTable = async (
  tableId: number
): Promise<Reservation | string> => {
  const table = await db.diningTable.findUnique({
    where: {
      id: tableId,
    },
    include: {
      reservations: {
        where: {
          reservationDate: {
            gte: new Date(),
          },
        },
        orderBy: {
          reservationDate: "asc",
        },
        take: 1,
      },
    },
  });

  if (!table) {
    return "The table is not found!";
  }
  if (!table.reservations || table.reservations.length === 0) {
    return "There are no reservations planned for this table!";
  }

  return table.reservations[0];
};

export const paginatedRestaurants = async (
  offset: number,
  limit: number
): Promise<{ restaurants: Restaurant[] | null; numberOfPages: number }> => {
  const restaurants = await db.restaurant.findMany({
    select: {
      id: true,
      uuid: true,
      name: true,
      address: true,
      location: true,
      businessHours: true,
      contact: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
    skip: offset * limit,
    take: limit,
  });
  const countRestaurants = await db.restaurant.count();
  const numberOfPages = Math.ceil(countRestaurants / limit);
  return { restaurants, numberOfPages };
};

export const paginatedSearchedRestaurants = async (
  offset: number,
  limit: number,
  query: string
): Promise<{ restaurants: Restaurant[] | null; numberOfPages: number }> => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      uuid: true,
      name: true,
      address: true,
      location: true,
      businessHours: true,
      contact: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
    skip: offset * limit,
    take: limit,
  });
  const countRestaurants = await db.restaurant.count({
    where: {
      name: {
        contains: query,
      },
    },
  });
  const numberOfPages = Math.ceil(countRestaurants / limit);
  return { restaurants, numberOfPages };
};

export const getRestaurantCategoriesByUUID = async (
  uuid: string
): Promise<string[]> => {
  const result = await db.restaurant.findMany({
    where: {
      uuid: uuid,
    },
    select: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories = result.flatMap(
    (item) => item.categories?.map((category) => category.name) || []
  );

  return categories;
};

export const addRestaurant = async (
  name: string,
  address: string,
  location: string,
  businessHours: string[],
  contact: string,
  ownerId: number
): Promise<Restaurant> => {
  async function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  ownerId += await getRandomInt(1230);
  return db.restaurant.create({
    data: {
      name,
      address,
      location,
      businessHours,
      contact,
      ownerId: 171,
    },
  });
};
