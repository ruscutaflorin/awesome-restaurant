import axios from "axios";
import { Restaurant } from "../types/types";
import { RESTAURANTS_PER_PAGE } from "../utils/constants";

export const fetchRestaurants = async (
  page: number,
  restaurantsPerPage: number = RESTAURANTS_PER_PAGE,
  token: string
) => {
  try {
    const response = await axios.get<{
      restaurants: Restaurant[] | null;
      numberOfPages: number;
    }>(
      `http://localhost:8000/api/restaurants/paginate?offset=${page}&limit=${restaurantsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRestaurant = async (uuid: string | string[]) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/restaurants/${uuid}`
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
