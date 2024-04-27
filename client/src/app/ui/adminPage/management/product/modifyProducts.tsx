"use client";
import React, { useState } from "react";
import { Product, Category } from "@/app/types/types";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  // onSubmit: (product: Product) => void; // Function to handle form submission
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  // onSubmit,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: product ? product.id : 0,
    name: product ? product.name : "",
    description: product ? product.description : "",
    price: product ? product.price : 0,
    basePrice: product ? product.basePrice : 0,
    ingredients: product ? product.ingredients : [],
    availability: product ? product.availability : true,
    categoryId: product ? product.categoryId : 0,
    createdAt: product ? product.createdAt : new Date(),
    updatedAt: product ? product.updatedAt : new Date(),
    category: product ? product.category : categories[0], // Default to the first category
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "availability" ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
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
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Other form fields... */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {product ? "Update" : "Add"} Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
