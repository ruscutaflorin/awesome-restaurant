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

export const restaurantCustomerCount = async (restaurantID: number) => {
  try {
    const orders = await db.order.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      select: {
        id: true,
      },
    });
    return orders.length;
  } catch (error) {}
};

export const restaurantHourlyCustomersCount = async (restaurantID: number) => {
  try {
    const orders: { createdAt: Date }[] = await db.order.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      select: {
        createdAt: true,
      },
    });

    const hourlyCustomers: number[] = new Array(24).fill(0);
    for (const order of orders) {
      const hour = new Date(order.createdAt).getHours();
      hourlyCustomers[hour] += 1;
    }

    return hourlyCustomers;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantDailyCustomersCount = async (restaurantID: number) => {
  try {
    const orders: { createdAt: Date }[] = await db.order.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      select: {
        createdAt: true,
      },
    });

    const dailyCustomers: number[] = new Array(7).fill(0);
    for (const order of orders) {
      const date = new Date(order.createdAt);
      const day = date.getDay();
      dailyCustomers[day] += 1;
    }
    // sat sun mon tue wed thu fri
    return dailyCustomers;
  } catch (error: any) {
    throw new Error(error);
  }
};
