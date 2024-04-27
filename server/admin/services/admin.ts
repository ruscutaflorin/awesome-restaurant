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

export const restaurantMostOrderedItems = async (
  restaurantID: number,
  numberOfItems: number
) => {
  try {
    const items = await db.orderItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      where: {
        order: {
          diningTable: {
            restaurantId: restaurantID,
          },
        },
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: numberOfItems,
    });

    const productNamesForRestaurant = await db.product.findMany({
      where: {
        category: {
          restaurantId: restaurantID,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const productNamesMap: { [key: number]: string } = {};

    productNamesForRestaurant.forEach((product) => {
      productNamesMap[product.id] = product.name;
    });

    const itemsWithNames = items.map((item) => ({
      productId: item.productId,
      name: productNamesMap[item.productId],
      quantity: item._sum.quantity,
    }));

    return itemsWithNames;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantReviewsGroupedByRating = async (
  restaurantID: number
) => {
  try {
    const reviews = await db.review.groupBy({
      by: ["rating"],
      _count: {
        id: true,
      },
      where: {
        restaurantId: restaurantID,
      },
    });
    const reviewsMap: { [key: number]: number } = {};
    reviews.forEach((review) => {
      reviewsMap[review.rating] = review._count.id;
    });

    return reviewsMap;
  } catch (error: any) {
    throw new Error(error);
  }
};
