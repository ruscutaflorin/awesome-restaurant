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

export const addCategory = async (restaurantId: number, category: string) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/admin/add-category/`,
      { id: restaurantId, category: category }
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const addDiningTable = async (
  restaurantID: number,
  name: string,
  capacity: number
) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/admin/add-table/`, {
      id: restaurantID,
      name: name,
      capacity: capacity,
    });
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
  numberOfPeople: number
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
      }
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
  staffRole: string
) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/admin/add-staff/`, {
      restaurantId: restaurantID,
      name: staffName,
      id: userId,
      role: staffRole,
    });
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
  availability: boolean
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
      }
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const editCategory = async (
  restaurantId: number,
  categoryId: number,
  category: string
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-category/`,
      { restaurantId: restaurantId, id: categoryId, category: category }
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
  capacity: number
) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/admin/edit-table`, {
      restaurantId: restaurantId,
      id: tableId,
      name: name,
      capacity: capacity,
    });
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
  availability: boolean
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
      }
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
  numberOfPeople: number
) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/admin/edit-reservation/`,
      {
        id: restaurantId,
        reservationId: reservationId,
        name: customerName,
        email: customerEmail,
        phone: contactNumber,
        date: reservationDate,
        persons: numberOfPeople,
      }
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
  staffRole: string
) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/admin/edit-staff/`, {
      id: userId,
      restaurantId: restaurantId,
      name: staffName,
      role: staffRole,
    });
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
  contact: string
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
      }
    );
    return res.status;
  } catch (error) {
    console.error(error);
  }
};
