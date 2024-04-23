import { Prisma } from "@prisma/client";
import { db } from "../../config/db";

export const restaurantIncomeFromOrdersService = async (
  restaurantID: number
) => {
  try {
    const orders = await db.order.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      select: {
        totalAmount: true,
      },
    });
    const total: Prisma.Decimal = orders.reduce(
      (acc: Prisma.Decimal, order) => acc.add(order.totalAmount),
      new Prisma.Decimal(0)
    );
    return total;
  } catch (error: any) {
    throw new Error(error);
  }
};
