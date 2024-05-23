import axios from "axios";

export const addRestaurant = async (
  name: string,
  address: string,
  location: string,
  businessHours: string[],
  contact: string | null,
  username: string,
  email: string,
  password: string
) => {
  try {
    const result = await axios.post(
      "http://localhost:8000/api/auth/restaurant",
      {
        name,
        address,
        location,
        businessHours,
        contact,
        username,
        email,
        password,
      }
    );
    return result.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
