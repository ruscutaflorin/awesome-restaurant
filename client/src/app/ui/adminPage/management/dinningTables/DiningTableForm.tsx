"use client";
import { useState } from "react";
import { DiningTable } from "@/app/types/types";
import { type } from "os";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type DiningTableFormProps = {
  diningTables: DiningTable[];
};

const schema = z.object({
  name: z.string().min(3).max(255),
  status: z.string().min(3).max(255),
  capacity: z.number().min(0),
  positionX: z.number().min(0),
  positionY: z.number().min(0),
});

type FormFields = z.infer<typeof schema>;

const DiningTableForm: React.FC<DiningTableFormProps> = ({ diningTables }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      status: "",
      capacity: 0,
      positionX: 0,
      positionY: 0,
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
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <div className="text-red-500">This field is required</div>
          )}
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <input
            {...register("status", { required: true })}
            type="text"
            id="status"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.status && (
            <div className="text-red-500">This field is required</div>
          )}
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700"
          >
            Capacity:
          </label>
          <input
            {...register("capacity", { required: true })}
            type="number"
            id="capacity"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.capacity && (
            <div className="text-red-500">This field is required</div>
          )}
        </div>
        <div>
          <label
            htmlFor="positionX"
            className="block text-sm font-medium text-gray-700"
          >
            Position X:
          </label>
          <input
            {...register("positionX", { required: true })}
            type="number"
            id="positionX"
            disabled={true}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.positionX && (
            <div className="text-red-500">This field is required</div>
          )}
        </div>
        <div>
          <label
            htmlFor="positionY"
            className="block text-sm font-medium text-gray-700"
          >
            Position Y:
          </label>
          <input
            {...register("positionY", { required: true })}
            type="number"
            id="positionY"
            disabled={true}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.positionY && (
            <div className="text-red-500">This field is required</div>
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

export default DiningTableForm;
