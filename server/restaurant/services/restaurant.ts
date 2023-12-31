import { db } from "../../config/db";
import { Reservation, Restaurant } from "../types/restaurant";

export const listRestaurants = async (): Promise<Restaurant[]> => {
  return db.restaurant.findMany({
    select: {
      id: true,
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

export const getNextReservationForTable = async (
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
