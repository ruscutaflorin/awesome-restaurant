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
