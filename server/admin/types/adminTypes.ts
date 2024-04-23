import { Prisma } from "@prisma/client";

export type CustomRestaurantIncome = Prisma.OrderFieldRefs & {
  getRestaurantIncomeFromOrders(restaurantId: number): Promise<Prisma.Decimal>;
};
