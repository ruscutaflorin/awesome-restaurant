import axios from "axios";
import { OrderItem, RestaurantWReviews } from "../types/types";
import { RESTAURANTS_PER_PAGE } from "../../lib/utils/constants";

export const fetchRestaurants = async (
  page: number,
  restaurantsPerPage: number = RESTAURANTS_PER_PAGE,
  token: string
) => {
  try {
    const response = await axios.get<{
      restaurants: RestaurantWReviews[] | null;
      numberOfPages: number;
    }>(
      `http://localhost:8000/api/restaurants/paginate?offset=${page}&limit=${restaurantsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRestaurant = async (uuid: string | string[], token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/restaurants/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const searchRestaurants = async (
  page: number,
  restaurantsPerPage: number = RESTAURANTS_PER_PAGE,
  token: string,
  querySearch: string
) => {
  try {
    const response = await axios.get<{
      restaurants: RestaurantWReviews[] | null;
      numberOfPages: number;
    }>(
      `http://localhost:8000/api/restaurants/paginate?offset=${page}&limit=${restaurantsPerPage}&query=${querySearch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRestaurantCategories = async (
  uuid: string | string[],
  token: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/restaurants/${uuid}/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createOrder = async (
  restaurantId: number,
  orderItems: OrderItem[],
  totalPrice: number,
  paymentStatus: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/restaurants/add-order`,
      {
        restaurantId,
        orderItems,
        totalPrice,
        paymentStatus,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
