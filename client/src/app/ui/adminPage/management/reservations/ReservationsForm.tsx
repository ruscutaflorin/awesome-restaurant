"use client";
import React, { useState } from "react";
import { Reservation } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ReservationsFormProps = {
  reservations: Reservation[];
};

const schema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  persons: z.string().min(1),
  date: z.string(),
  time: z.string(),
  message: z.string().min(3).max(255),
});

type FormFields = z.infer<typeof schema>;

const ReservationsForm: React.FC<ReservationsFormProps> = ({
  reservations,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      persons: "",
      date: "",
      time: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An error occurred while submitting the form",
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-4 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-4">Reservation Form</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            {...register("phone")}
            type="string"
            name="phone"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="persons"
            className="block text-sm font-medium text-gray-700"
          >
            Persons:
          </label>
          <input
            {...register("persons")}
            type="number"
            name="persons"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.persons && (
            <div className="text-red-500">{errors.persons.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            {...register("date")}
            type="date"
            name="date"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.date && (
            <div className="text-red-500">{errors.date.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time:
          </label>
          <input
            {...register("time")}
            type="time"
            name="time"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          {errors.time && (
            <div className="text-red-500">{errors.time.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            {...register("message")}
            type="text"
            name="message"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.message && (
            <div className="text-red-500">{errors.message.message}</div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationsForm;
