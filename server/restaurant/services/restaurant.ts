import { db } from "../../config/db";
import { Reservation, Restaurant } from "../types/restaurant.types";

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
): Promise<Reservation | null> => {
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

  if (!table || !table.reservations || table.reservations.length === 0) {
    return null;
  }

  return table.reservations[0];
};

// Si daca am relation querries dc mai am nevoie de chestia din db.server, am nevoie ca sa nu o scriu de 100 de ori
