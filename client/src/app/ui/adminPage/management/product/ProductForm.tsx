"use client";
import React from "react";
import { Product, Category } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ProductFormProps = {
  product?: Product;
  categories: Category[];
};

const schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0),
  basePrice: z.number().min(0),
  ingredients: z.string().min(3).max(255),
  availability: z.boolean(),
  category: z.number().min(1),
});

type FormFields = z.infer<typeof schema>;

const ProductForm: React.FC<ProductFormProps> = ({ product, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      basePrice: product?.basePrice || 0,
      ingredients: Array.isArray(product?.ingredients)
        ? product?.ingredients.join(", ")
        : product?.ingredients ?? "",
      availability: product?.availability || true,
      category: product?.category?.id || 1,
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
            {...register("name")}
            type="text"
            name="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            {...register("description")}
            type="text"
            name="description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {errors.description && (
          <div className="text-red-500">{errors.description.message}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            {...register("price")}
            type="number"
            name="price"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {errors.price && (
          <div className="text-red-500">{errors.price.message}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="basePrice"
            className="block text-sm font-medium text-gray-700"
          >
            Base Price:
          </label>
          <input
            {...register("basePrice")}
            type="number"
            name="basePrice"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.basePrice && (
            <div className="text-red-500">{errors.basePrice.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients:
          </label>
          <input
            {...register("ingredients")}
            type="text"
            name="ingredients"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.ingredients && (
            <div className="text-red-500">{errors.ingredients.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-gray-700"
          >
            Availability:
          </label>
          <select
            {...register("availability")}
            name="availability"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          {errors.availability && (
            <div className="text-red-500">{errors.availability.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          {/* Assume you have a function to fetch categories */}
          <select
            {...register("category")}
            id="category"
            name="category"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Render options dynamically based on fetched categories */}
            {/* For each category in fetched categories */}
            <option value="{categoryId}">Category Name</option>
          </select>
          {errors.category && (
            <div className="text-red-500">{errors.category.message}</div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default ProductForm;
