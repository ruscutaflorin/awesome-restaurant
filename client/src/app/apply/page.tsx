"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import restaurantImage from "@/../public/hero.avif";
import { addRestaurant } from "../api/apply";
import { useAuthStore } from "../store/user";
const RestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  location: z.string().min(1, "Location is required"),
  businessHours: z.string().min(1, "Business hours is required"),
  contact: z.string().nullable(),
  ownerId: z.number().int().positive(),
});

type RestaurantFormValues = z.infer<typeof RestaurantSchema>;

const AddRestaurantForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantFormValues>({
    defaultValues: {
      name: "",
      address: "",
      location: "",
      businessHours: "",
      contact: "",
      ownerId: 0,
    },
    resolver: zodResolver(RestaurantSchema),
  });

  const onSubmit: SubmitHandler<RestaurantFormValues> = async (
    data: RestaurantFormValues
  ) => {
    try {
      const result = await addRestaurant(
        data.name,
        data.address,
        data.location,
        data.businessHours.split(",").map((hour) => hour.trim()),
        data.contact,
        data.ownerId
      );
      console.log(result);
      if (result === 200) {
        console.log("Added successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="hero-container h-screen items-center flex justify-center items-center bg-cover bg-center bg-no-repeat  relative"
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Name
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
              Address
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
              Location
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
              placeholder="9AM 5PM, Monday - Friday, Closed on Saturday and Sunday"
            />
            {errors.businessHours && (
              <span className="text-red-500 text-sm">
                {errors.businessHours.message}
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Contact
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

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="block text-neutral-900 font-semibold mb-1">
              Owner ID
            </label>
            <input
              type="number"
              {...register("ownerId", { valueAsNumber: true })}
              className="p-3 w-full border border-orange-500 rounded"
            />
            {errors.ownerId && (
              <span className="text-red-500 text-sm">
                {errors.ownerId.message}
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
