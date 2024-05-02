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

export const restaurantCategories = async (restaurantID: number) => {
  try {
    const categories = await db.category.findMany({
      where: {
        restaurantId: restaurantID,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantDiningTables = async (restaurantID: number) => {
  try {
    const diningTables = await db.diningTable.findMany({
      where: {
        restaurantId: restaurantID,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   createdAt: true,
      // },
    });

    return diningTables;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantOrders = async (restaurantID: number) => {
  try {
    const orders = await db.order.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      // select: {
      //   id: true,
      //   totalAmount: true,
      //   createdAt: true,
      // },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantProducts = async (restaurantID: number) => {
  try {
    const products = await db.product.findMany({
      where: {
        category: {
          restaurantId: restaurantID,
        },
      },
      // select: {
      //   id: true,
      //   name: true,
      //   price: true,
      //   createdAt: true,
      // },
    });
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantReservations = async (restaurantID: number) => {
  try {
    const reservations = await db.reservation.findMany({
      where: {
        diningTable: {
          restaurantId: restaurantID,
        },
      },
      // select: {
      //   id: true,
      //   totalAmount: true,
      //   createdAt: true,
      // },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantDetails = async (restaurantID: number) => {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: {
        id: restaurantID,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   address: true,
      //   location: true,
      //   businessHours: true,
      //   contact: true,
      //   ownerId: true,
      //   createdAt: true,
      //   updatedAt: true,
      // },
    });
    return restaurant;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const restaurantStaffUsers = async (restaurantID: number) => {
  try {
    const staff = await db.staffUser.findMany({
      where: {
        restaurantId: restaurantID,
      },
      include: {
        permissions: true,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   role: true,
      //   createdAt: true,
      // },
    });

    return staff;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addCategory = async (restaurantID: number, name: string) => {
  try {
    const category = await db.category.create({
      data: {
        name: name,
        restaurantId: restaurantID,
      },
    });
    return category;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addDiningTable = async (
  restaurantID: number,
  name: string,
  capacity: number
) => {
  try {
    const diningTable = await db.diningTable.create({
      data: {
        name,
        capacity: capacity,
        restaurantId: restaurantID,
        status: "Available",
        positionX: 0,
        positionY: 0,
      },
    });
    return diningTable;
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const addProduct = async (restaurantID: number, name: string, description: string, price: number, basePrice: number, ingredients: string[], avaibility: boolean) => {
// categorie pt fiecare produs de adaugat in form

export const addReservation = async (
  restaurantID: number,
  name: string,
  email: string,
  phone: string,
  date: Date,
  persons: number
) => {
  try {
    const reservation = await db.reservation.create({
      data: {
        reservationDate: date,
        numberOfGuests: persons,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        reservationStatus: "Pending",
        tableId: undefined,
        restaurant: {
          connect: {
            id: restaurantID,
          },
        },
        diningTable: {
          connect: {
            id: restaurantID,
            // TODO:aici trebuia sa fie tableId, dar nu am adus din formular tableId
          },
        },
      },
    });
    return reservation;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addStaffUser = async (
  userId: number,
  restaurantID: number,
  name: string,
  role: string
) => {
  try {
    const staffUser = await db.staffUser.create({
      data: {
        name: name,
        role: role,
        restaurantId: restaurantID,
        userId: userId,
      },
    });
    return staffUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

// folosesc connect pt a crea o inregistrare noua si pt a o lega de tabele
