import { Prisma } from "@prisma/client";

export type CustomDiningTable = Prisma.DiningTableFieldRefs & {
  getNextReservation(tableId: number): Promise<Restaurant | string>;
};

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  location: string;
  businessHours: string[];
  contact: string | null;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DiningTable = {
  id: number;
  name: string;
  status: string;
  capacity: number;
  positionX: number;
  positionY: number;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Reservation = {
  id: number;
  restaurantId: number;
  tableId: number;
  reservationDate: Date;
  numberOfGuests: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  reservationStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: number;
  status: string;
  orderDate: Date;
  totalAmount: number;
  tableId: number;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: number;
  status: string;
  method: string;
  transactionId: string | null;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: number;
  name: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  basePrice: number;
  ingredients: string[];
  availability: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StaffUser = {
  id: number;
  name: string;
  role: string;
  userId: number;
  restaurantId: number;
  permissionId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Permission = {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePic: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  id: number;
  userId: number;
  restaurantId: number;
  productId: number;
  rating: number;
  reviewText: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  diningTableId: number;
};
