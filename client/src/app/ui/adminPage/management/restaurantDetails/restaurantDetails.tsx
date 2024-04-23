"use client";
import { Restaurant } from "@/app/types/types";
import { useState } from "react";

type restaurantDetailsProps = {
  restaurant: Restaurant;
};

const RestaurantDetailsUI: React.FC<restaurantDetailsProps> = ({
  restaurant,
}) => {
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [location, setLocation] = useState(restaurant.location);
  const [businessHours, setBusinessHours] = useState(
    restaurant.businessHours.join(", ")
  );
  const [contact, setContact] = useState(restaurant.contact);

  const handleSave = () => {
    const modifiedRestaurant: Restaurant = {
      ...restaurant,
      name,
      address,
      location,
      businessHours: businessHours.split(",").map((hour) => hour.trim()),
      contact,
    };
    console.log(modifiedRestaurant);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Name:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Address:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Location:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Business Hours:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Contact:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={contact || ""}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default RestaurantDetailsUI;
