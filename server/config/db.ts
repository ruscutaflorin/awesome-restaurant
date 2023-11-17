import { PrismaClient } from "@prisma/client";
import {
  nextReservationForTable,
  getRestaurantById,
} from "../restaurant/services/restaurant";
let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined | any;
}

if (!globalThis.__db) {
  globalThis.__db = new PrismaClient().$extends({
    model: {
      diningTable: {
        async getNextReservationForTable(tableId: number) {
          try {
            const result = await nextReservationForTable(tableId);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
      },
      restaurant: {
        async getRestaurantById(uuid: string) {
          try {
            const result = await getRestaurantById(uuid);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
      },
    },
  });
}

db = globalThis.__db;

export { db };
