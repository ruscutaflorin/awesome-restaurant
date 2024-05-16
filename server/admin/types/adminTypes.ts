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

export type CustomRestaurantCategories = Prisma.CategoryFieldRefs & {
  getRestaurantCategories(restaurantId: number): Promise<any>;
};

export type CustomRestaurantDiningTables = Prisma.DiningTableFieldRefs & {
  getDiningTablesByRestaurantId(restaurantId: number): Promise<any>;
};

export type CustomRestaurantOrders = Prisma.OrderFieldRefs & {
  getRestaurantOrders(restaurantId: number): Promise<any>;
};

export type CustomRestaurantProducts = Prisma.ProductFieldRefs & {
  getRestaurantProducts(restaurantId: number): Promise<any>;
};

export type CustomRestaurantReservations = Prisma.ReservationFieldRefs & {
  getRestaurantReservations(restaurantId: number): Promise<any>;
};

export type CustomRestaurantDetails = Prisma.RestaurantFieldRefs & {
  getRestaurantDetails(restaurantId: number): Promise<any>;
};

export type CustomRestaurantStaffUsers = Prisma.UserFieldRefs & {
  getRestaurantStaffUsers(restaurantId: number): Promise<any>;
};
