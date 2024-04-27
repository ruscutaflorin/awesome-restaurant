import { Prisma } from "@prisma/client";

export type CustomRestaurantIncome = Prisma.OrderFieldRefs & {
  getRestaurantIncomeFromOrders(restaurantId: number): Promise<Prisma.Decimal>;
};

export type CustomRestaurantCustomersCount = Prisma.OrderFieldRefs & {
  getRestaurantCustomerCount(restaurantId: number): Promise<number>;
};

export type CustomRestaurantHourlyCustomersCount = Prisma.OrderFieldRefs & {
  getRestaurantHourlyCustomersCount(restaurantId: number): Promise<any>;
};

export type CustomRestaurantDailyCustomersCount = Prisma.OrderFieldRefs & {
  getRestaurantDailyCustomersCount(restaurantId: number): Promise<any>;
};

export type CustomRestaurantMostPopularItems = Prisma.OrderItemFieldRefs & {
  getRestaurantMostPopularItems(
    restaurantId: number,
    limit: number
  ): Promise<any>;
};

export type CustomRestaurantReviews = Prisma.ReviewFieldRefs & {
  getRestaurantReviewsGroupedByRating(restaurantId: number): Promise<any>;
};
