import axios from "axios";

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const restaurantIncome = async (restaurantID: number, token: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/income/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantCustomers = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/customers/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantHourlyCustomers = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/hourly-activity/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantDailyCustomers = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/daily-activity/${restaurantID}/`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantMostOrderedItems = async (
  restaurantID: number,
  numberOfItems: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/popular?id=${restaurantID}&limit=${numberOfItems}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantReviews = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/reviews/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantCategories = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/categories/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantDiningTables = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/tables/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantOrders = async (restaurantID: number, token: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/orders/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantProducts = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/products/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantReservations = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/reservations/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantDetails = async (
  restaurantID: number,
  token: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/restaurant/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const restaurantStaff = async (restaurantID: number, token: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/admin/staff/${restaurantID}`,
      getAuthHeaders(token)
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCategory = async (
  restaurantId: number,
  category: string,
  token: string
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-category/`,
      { id: restaurantId, category: category },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const addDiningTable = async (
  restaurantID: number,
  name: string,
  capacity: number,
  token: string
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-table/`,
      {
        id: restaurantID,
        name: name,
        capacity: capacity,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const addReservation = async (
  restaurantID: number,
  customerName: string,
  customerEmail: string,
  contactNumber: string,
  reservationDate: string,
  numberOfPeople: number,
  token: string
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-reservation/`,
      {
        id: restaurantID,
        name: customerName,
        email: customerEmail,
        phone: contactNumber,
        date: reservationDate,
        persons: numberOfPeople,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const addStaff = async (
  userId: number,
  restaurantID: number,
  staffName: string,
  staffRole: string,
  token: string
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-staff/`,
      {
        restaurantId: restaurantID,
        name: staffName,
        id: userId,
        role: staffRole,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (
  name: string,
  description: string,
  price: number,
  basePrice: number,
  categoryID: number,
  ingredients: string,
  availability: boolean,
  token: string
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-product/`,
      {
        name: name,
        description: description,
        price: price,
        basePrice: basePrice,
        categoryID: categoryID,
        ingredients: ingredients.split(","),
        availability: availability,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editCategory = async (
  restaurantId: number,
  categoryId: number,
  category: string,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-category/`,
      { restaurantId: restaurantId, id: categoryId, category: category },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editDiningTable = async (
  restaurantId: number,
  tableId: number,
  name: string,
  capacity: number,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-table`,
      {
        restaurantId: restaurantId,
        id: tableId,
        name: name,
        capacity: capacity,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProduct = async (
  productId: number,
  name: string,
  description: string,
  price: number,
  basePrice: number,
  categoryID: number,
  ingredients: string,
  availability: boolean,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-product/`,
      {
        id: productId,
        name: name,
        description: description,
        price: price,
        basePrice: basePrice,
        categoryID: categoryID,
        ingredients: ingredients.split(","),
        availability: availability,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editReservation = async (
  restaurantId: number,
  reservationId: number,
  customerName: string,
  customerEmail: string,
  contactNumber: string,
  reservationDate: string,
  numberOfPeople: number,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-reservation/`,
      {
        restaurantId: restaurantId,
        id: reservationId,
        name: customerName,
        email: customerEmail,
        phone: contactNumber,
        date: reservationDate,
        persons: numberOfPeople,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editStaff = async (
  userId: number,
  restaurantId: number,
  staffName: string,
  staffRole: string,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-staff/`,
      {
        id: userId,
        restaurantId: restaurantId,
        name: staffName,
        role: staffRole,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editRestaurantDetails = async (
  restaurantId: number,
  name: string,
  address: string,
  location: string,
  businessHours: string[],
  contact: string,
  token: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-restaurant/`,
      {
        id: restaurantId,
        name: name,
        address: address,
        location: location,
        businessHours: businessHours,
        contact: contact,
      },
      getAuthHeaders(token)
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};
