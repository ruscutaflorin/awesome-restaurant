import { PrismaClient } from "@prisma/client";
import { getNextReservationForTable } from "../restaurant/services/restaurant";
let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined | any;
}

if (!globalThis.__db) {
  globalThis.__db = new PrismaClient().$extends({
    model: {
      diningTable: {
        async getNextReservation(tableId: number) {
          try {
            const result = await getNextReservationForTable(tableId);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
      },
      restaurant: {
        async getBestRestaurant(name: string) {
          console.log("inside getBestRestaurant");
        },
      },
    },
  });
}

db = globalThis.__db;

export { db };
