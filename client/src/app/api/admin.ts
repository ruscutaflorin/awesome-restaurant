import axios from "axios";

export const restaurantIncome = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/income/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const restaurantCustomers = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/customers/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const restaurantHourlyCustomers = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/hourly-activity/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const restaurantDailyCustomers = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/daily-activity/${restaurantID}/`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantMostOrderedItems = async (
  restaurantID: number,
  numberOfItems: number
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/popular?id=${restaurantID}&limit=${numberOfItems}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantReviews = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/reviews/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
