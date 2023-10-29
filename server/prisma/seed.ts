import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    for (let i = 0; i < 100; i++) {
      // Create a new User with a unique email address
      const user = await prisma.user.create({
        data: {
          name: `User ${i}`,
          email: `user${i}_${Date.now()}@example.com`, // Unique email address
          password: "password123", // Change this to a secure password hashing method
        },
      });

      // Create a new Permission with random data
      const permission = await prisma.permission.create({
        data: {
          name: `Permission ${i}`,
          code: `permission_${i}`,
        },
      });

      // Create a new Restaurant with random data
      const restaurant = await prisma.restaurant.create({
        data: {
          name: `Restaurant ${i}`,
          address: `Address ${i}`,
          location: `Location ${i}`,
          businessHours: ["9 AM - 5 PM"],
          ownerId: user.id,
        },
      });

      // Create a new DiningTable with random data
      const diningTable = await prisma.diningTable.create({
        data: {
          name: `Dining Table ${i}`,
          status: "Available",
          capacity: Math.floor(Math.random() * 10) + 2,
          positionX: Math.floor(Math.random() * 100),
          positionY: Math.floor(Math.random() * 100),
          restaurantId: restaurant.id,
        },
      });

      // Create a new Order with random data
      const order = await prisma.order.create({
        data: {
          status: "Pending",
          orderDate: new Date(),
          totalAmount: Math.floor(Math.random() * 100) + 10,
          tableId: diningTable.id,
          userId: user.id,
        },
      });

      // Create a new Category with random data
      const category = await prisma.category.create({
        data: {
          name: `Category ${i}`,
          restaurantId: restaurant.id,
        },
      });

      // Create a new Product with random data
      const product = await prisma.product.create({
        data: {
          name: `Product ${i}`,
          description: `Description ${i}`,
          price: Math.floor(Math.random() * 50) + 5,
          basePrice: Math.floor(Math.random() * 40) + 5,
          ingredients: ["Ingredient1", "Ingredient2"],
          availability: true,
          categoryId: category.id,
        },
      });

      // Create a new Reservation with random data
      const reservation = await prisma.reservation.create({
        data: {
          restaurantId: restaurant.id,
          tableId: diningTable.id,
          reservationDate: new Date(),
          numberOfGuests: Math.floor(Math.random() * 10) + 2,
          customerName: `Customer ${i}`,
          customerPhone: `Phone ${i}`,
          reservationStatus: "Pending",
        },
      });

      // Create a new Review with random data
      const review = await prisma.review.create({
        data: {
          restaurantId: restaurant.id,
          userId: user.id,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewText: `Review Text ${i}`,
          productId: product.id,
        },
      });

      // Create a new StaffUser with random data
      const staffUser = await prisma.staffUser.create({
        data: {
          name: `Staff User ${i}`,
          role: "Waiter",
          userId: user.id,
          restaurantId: restaurant.id,
        },
      });

      // Create a new Payment with random data
      const payment = await prisma.payment.create({
        data: {
          status: "Completed",
          method: "Credit Card",
          transactionID: `TransactionID ${i}`,
          orderId: order.id,
        },
      });

      // Create a new OrderItem with random data
      const orderItem = await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          diningTableId: diningTable.id,
        },
      });
    }

    console.log("100 test values inserted successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
