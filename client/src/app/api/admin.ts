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

export const restaurantCategories = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/categories/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantDiningTables = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/tables/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantOrders = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/orders/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantProducts = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/products/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantReservations = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/reservations/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantDetails = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/restaurant/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantStaff = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/staff/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
