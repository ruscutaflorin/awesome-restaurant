import React from "react";
import { Product, Category } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";

type ProductFormProps = {
  product: Product;
  categories: Category[];
  onClose: () => void;
};

const schema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  basePrice: z.number().positive(),
  ingredients: z.string(),
  availability: z.boolean(),
  category: z.number(),
});

type FormFields = z.infer<typeof schema>;

const ProductForm = ({ product, categories, onClose }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          basePrice: product.basePrice,
          ingredients: product.ingredients[0],
          availability: product.availability,
          category: product.categoryId,
        }
      : {},
    resolver: zodResolver(schema),
  });
  console.log(product);
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
        className="w-96 p-4 bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <CloseIcon
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        />{" "}
        <h1 className="text-2xl font-semibold mb-4">Product Form</h1>
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
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            {...register("description")}
            type="text"
            name="description"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          {errors.availability && (
            <div className="text-red-500">{errors.availability.message}</div>
          )}
        </div>
        {categories && (
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              {...register("category")}
              id="category"
              name="category"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="text-red-500">{errors.category.message}</div>
            )}
          </div>
        )}
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

export default ProductForm;
