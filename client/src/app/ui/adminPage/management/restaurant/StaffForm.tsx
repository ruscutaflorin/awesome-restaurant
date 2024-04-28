"use client";
import React, { useState } from "react";
import { StaffUserDetailed } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type StaffFormProps = {
  staffUsers: StaffUserDetailed[];
};

const schema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  role: z.string().min(3).max(255),
  restaurantId: z.number().min(1),
  permissions: z.array(
    z.object({
      id: z.number().min(1),
      name: z.string().min(3).max(255),
      code: z.string().min(3).max(255),
    })
  ),
});

type FormFields = z.infer<typeof schema>;

const StaffForm: React.FC<StaffFormProps> = ({ staffUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      restaurantId: 0,
      permissions: [],
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
        <h1 className="text-2xl font-semibold mb-4">Staff Form</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
            <input
              type="text"
              className="form-input mt-1 block w-full"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
            <input
              type="email"
              className="form-input mt-1 block w-full"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role:
            <input
              type="text"
              className="form-input mt-1 block w-full"
              {...register("role")}
            />
            {errors.role && (
              <div className="text-red-500">{errors.role.message}</div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="restaurantId"
            className="block text-gray-700 font-bold mb-2"
          >
            Restaurant ID:
            <input
              type="number"
              disabled={true}
              className="form-input mt-1 block w-full"
              {...register("restaurantId")}
            />
            {errors.restaurantId && (
              <div className="text-red-500">{errors.restaurantId.message}</div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="permissions"
            className="block text-gray-700 font-bold mb-2"
          >
            Permissions:
            <input
              type="text"
              className="form-input mt-1 block w-full"
              {...register("permissions")}
            />
            {errors.permissions && (
              <div className="text-red-500">{errors.permissions.message}</div>
            )}
          </label>
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

export default StaffForm;
