import axios from "axios";

export const addRestaurant = async (
  name: string,
  address: string,
  location: string,
  businessHours: string[],
  contact: string | null,
  ownerId: number
) => {
  try {
    const result = await axios.post(
      "http://localhost:8000/api/restaurants/add",
      {
        name,
        address,
        location,
        businessHours,
        contact,
        ownerId,
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
