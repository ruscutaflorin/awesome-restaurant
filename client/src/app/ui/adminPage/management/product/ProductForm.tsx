import React from "react";
import { Product, Category } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { addProduct, editProduct } from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";

type ProductFormProps = {
  product?: Product;
  categories: Category[];
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive(),
  basePrice: z.coerce.number().positive(),
  ingredients: z.string().min(1, "Ingredients are required"),
  availability: z.coerce.boolean(),
  category: z.coerce.number(),
});

type FormFields = z.infer<typeof schema>;

const ProductForm = ({
  product,
  categories,
  onClose,
  action,
}: ProductFormProps) => {
  const token = useAuthStore((state) => state.token);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      id: product?.id ?? 0,
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      basePrice: product?.basePrice ?? 0,
      ingredients: product?.ingredients.join(", ") ?? "",
      availability: product?.availability ?? true,
      category:
        product?.categoryId ?? (categories.length > 0 ? categories[0].id : 0),
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        ...data,
        ingredients: data.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
      };

      if (token) {
        if (action === "edit") {
          const result = await editProduct(
            payload.id!,
            payload.name,
            payload.description,
            payload.price,
            payload.basePrice,
            payload.category,
            payload.ingredients.join(", "),
            payload.availability,
            token
          );
          if (result === 200) {
            console.log("Updated successfully");
            onClose();
          }
        } else {
          const result = await addProduct(
            payload.name,
            payload.description,
            payload.price,
            payload.basePrice,
            payload.category,
            payload.ingredients.join(", "),
            payload.availability,
            token
          );
          if (result === 200) {
            console.log("Product added successfully");
            onClose();
          }
        }
      }
    } catch (error) {
      console.error(error);
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
        />
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
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
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
          {errors.price && (
            <div className="text-red-500">{errors.price.message}</div>
          )}
        </div>
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
          {action == "edit" && (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Commit Changes"}
            </button>
          )}
          {action == "add" && (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add"}
            </button>
          )}
          {!action && (
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Close
            </button>
          )}
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
