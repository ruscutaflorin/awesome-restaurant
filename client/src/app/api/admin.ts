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
      `http://localhost:8000/api/admin/hourlyCustomers/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export const restaurantDailyCustomersCount = async (restaurantID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/dailyCustomers/${restaurantID}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}