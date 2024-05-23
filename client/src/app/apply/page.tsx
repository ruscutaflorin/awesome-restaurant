"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import restaurantImage from "@/../public/hero.avif";
import { addRestaurant } from "../api/apply";

const RestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  location: z.string().min(1, "Location is required"),
  businessHours: z.string().min(1, "Business hours is required"),
  contact: z.string().nullable(),
  userName: z.string().min(1, "User name is required"),
  userEmail: z.string().email("Invalid email address"),
  userPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

type RestaurantFormValues = z.infer<typeof RestaurantSchema>;

const AddRestaurantForm: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RestaurantFormValues>({
    defaultValues: {
      name: "",
      address: "",
      location: "",
      businessHours: "",
      contact: "",
      userName: "",
      userEmail: "",
      userPassword: "",
    },
    resolver: zodResolver(RestaurantSchema),
  });

  const onSubmit: SubmitHandler<RestaurantFormValues> = async (data) => {
    try {
      const result = await addRestaurant(
        data.name,
        data.address,
        data.location,
        data.businessHours.split(",").map((hour) => hour.trim()),
        data.contact,
        data.userName,
        data.userEmail,
        data.userPassword
      );
      console.log(result);
      if (result === 200) {
        setNotification("Restaurant added successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      setNotification("An error occurred while adding the restaurant.");
    } finally {
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div
      className="hero-container h-screen items-center flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${restaurantImage.src})`,
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-85 shadow-lg rounded-lg mb-40">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Add a New Restaurant
        </h2>
        <p className="mb-6 text-neutral-900">
          Please fill out the form below to add a new restaurant to our
          database. Make sure all fields are correctly filled out before
          submitting.
        </p>
        {notification && (
          <div className="mb-4 p-4 text-center text-white bg-green-500 rounded">
            {notification}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              User Name
            </label>
            <input
              {...register("userName")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              User Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.userEmail && (
              <span className="text-red-500 text-sm">
                {errors.userEmail.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              User Password
            </label>
            <input
              type="password"
              {...register("userPassword")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.userPassword && (
              <span className="text-red-500 text-sm">
                {errors.userPassword.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Restaurant Name
            </label>
            <input
              {...register("name")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Restaurant Address
            </label>
            <input
              {...register("address")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Restaurant Location
            </label>
            <input
              {...register("location")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Business Hours (split by comma)
            </label>
            <textarea
              {...register("businessHours")}
              className="p-3 w-full border border-orange-500 rounded"
              placeholder="9AM - 5PM, Monday - Friday, Closed on Saturday and Sunday"
            />
            {errors.businessHours && (
              <span className="text-red-500 text-sm">
                {errors.businessHours.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Restaurant Contact
            </label>
            <input
              {...register("contact")}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.contact && (
              <span className="text-red-500 text-sm">
                {errors.contact.message}
              </span>
            )}
          </div>

          <div className="w-full p-2">
            <button
              type="submit"
              className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantForm;
