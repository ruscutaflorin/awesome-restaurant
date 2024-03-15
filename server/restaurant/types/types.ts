import { Prisma } from "@prisma/client";
export type CustomDiningTable = Prisma.DiningTableFieldRefs & {
  getNextReservationForTable(tableId: number): Promise<Restaurant | string>;
};
export type CustomRestaurantDetailed = Prisma.RestaurantFieldRefs & {
  getRestaurantById(id: string): Promise<RestaurantDetailed | string>;
};
export type CustomPaginatedRestaurant = Restaurant & {
  getPaginatedRestaurants(
    offset: number,
    limit: number
  ): Promise<{ restaurants: Restaurant[] | null; numberOfPages: number }>;
};
export type CustomSearchPaginatedRestaurant = Restaurant & {
  getSearchPaginatedRestaurants(
    offset: number,
    limit: number,
    query: string
  ): Promise<{ restaurants: Restaurant[] | null; numberOfPages: number }>;
};

export type RestaurantDetailed = {
  diningTables: DiningTable[];
  categories: Category[];
  reservations: Reservation[];
  reviews: Review[];
} & Restaurant;

export type Restaurant = {
  id: number;
  uuid: string;
  name: string;
  address: string;
  location: string;
  businessHours: string[];
  contact: string | null;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DiningTableDetailed = {
  reservations: Reservation[];
  productOrders: OrderItem[];
  Order: Order[];
} & DiningTable;

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

export type ReservationDetailed = {
  restaurant: Restaurant;
  diningTable: DiningTable;
} & Reservation;

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

export type OrderDetailed = {
  diningTable: DiningTable;
  orderItems: OrderItem[];
  payments: Payment[];
  user: User | null;
} & Order;

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

export type PaymentDetailed = {
  order: Order;
} & Payment;

export type Payment = {
  id: number;
  uuid: string;
  status: string;
  method: string;
  transactionID: string | null;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryDetailed = {
  products: Product[];
  restaurant: Restaurant;
} & Category;

export type Category = {
  id: number;
  name: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductDetailed = {
  orderItems: OrderItem[];
  reviews: Review[];
} & Product;

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
  category: Category;
};

export type StaffUserDetailed = {
  permissions: Permission[];
  user: User;
  restaurant: Restaurant;
} & StaffUser;

export type StaffUser = {
  id: number;
  name: string;
  role: string;
  userId: number;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PermissionDetailed = {
  staffUsers: StaffUser[];
} & Permission;

export type Permission = {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDetailed = {
  orders: Order[];
  reviews: Review[];
  restaurants: Restaurant[];
  staffUser: StaffUser | null;
} & User;

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePic: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewDetailed = {
  restaurant: Restaurant;
  user: User;
  product: Product | null;
} & Review;

export type Review = {
  id: number;
  restaurantId: number;
  userId: number;
  productId: number;
  rating: number;
  reviewText: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItemDetailed = {
  order: Order;
  product: Product;
  diningTable: DiningTable | null;
} & OrderItem;

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  diningTableId: number | null;
  createdAt: Date;
  updatedAt: Date;
};
