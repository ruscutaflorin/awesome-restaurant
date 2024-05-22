import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { addCategory, editCategory } from "@/app/api/admin";
import { Category } from "@/app/types/types";
import { useAuthStore } from "@/app/store/user";

type CategoryFormProps = {
  categories?: Category;
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  id: z.coerce.number(),
  name: z.string().min(3).max(255),
});

type FormFields = z.infer<typeof schema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  categories,
  onClose,
  action,
}) => {
  const token = useAuthStore((state) => state.token);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      id: categories?.id || 0,
      name: categories?.name || "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (restaurantId && token) {
        if (action === "edit") {
          const result = await editCategory(
            restaurantId,
            data.id,
            data.name,
            token
          );
          if (result === 200) {
            console.log("Updated successfully");
            onClose();
          }
        } else {
          const res = await addCategory(restaurantId, data.name, token);
          if (res === 200) {
            console.log("Added successfully");
            onClose();
          }
        }
      }
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
        />
        <h1 className="text-2xl font-semibold mb-4">Category Form</h1>
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
        <div className="flex justify-end">
          {action === "edit" && (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Commit Changes"}
            </button>
          )}
          {action === "add" && (
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
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
