import { PrismaClient } from "@prisma/client";
import {
  nextReservationForTable,
  getRestaurantById,
  paginatedRestaurants,
  paginatedSearchedRestaurants,
} from "../restaurant/services/restaurant";
import { restaurantIncomeFromOrdersService } from "../admin/services/admin";

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
      order: {
        async getRestaurantIncomeFromOrders(restaurantId: number) {
          try {
            const result = await restaurantIncomeFromOrdersService(
              restaurantId
            );
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
        async getPaginatedRestaurants(offset: number, limit: number) {
          try {
            const result = await paginatedRestaurants(offset, limit);
            return result;
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
        async getSearchPaginatedRestaurants(
          offset: number,
          limit: number,
          query: string
        ) {
          try {
            const result = await paginatedSearchedRestaurants(
              offset,
              limit,
              query
            );
            return result;
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
      },
    },
  });
}

db = globalThis.__db;

export { db };
