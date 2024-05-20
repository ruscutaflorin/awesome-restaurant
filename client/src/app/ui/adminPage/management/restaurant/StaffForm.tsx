"use client";
import React, { useState } from "react";
import { StaffUserDetailed } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { addStaff, editStaff } from "@/app/api/admin";
type StaffFormProps = {
  staffUsers: StaffUserDetailed[];
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  name: z.string().min(3).max(255),
  role: z.string().min(3).max(255),
  restaurantId: z.coerce.number().min(1),
  permissions: z.coerce.string().min(3).max(255),
  userId: z.coerce.number().min(1),
});
// poate sa aleg dintr-o lista de permisiuni, asa e dubios
type FormFields = z.infer<typeof schema>;

const StaffForm: React.FC<StaffFormProps> = ({
  staffUsers,
  onClose,
  action,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      userId: staffUsers[0]?.userId,
      name: staffUsers[0]?.name,
      role: staffUsers[0]?.role,
      restaurantId: staffUsers[0]?.restaurantId || 1,
      permissions: staffUsers[0]?.permissions.join(",") || "", // Convert array to string
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (action === "edit") {
        const result = await editStaff(
          data.userId,
          data.restaurantId,
          data.name,
          data.role
        );
        if (result === 200) {
          console.log("Updated successfully");
          onClose();
        }
      } else {
        const result = await addStaff(
          data.userId,
          data.restaurantId,
          data.name,
          data.role
        );
        if (result == 200) {
          console.log("Staff added successfully");
          onClose();
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
        />{" "}
        <h1 className="text-2xl font-semibold mb-4">Staff Form</h1>
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            User ID:
            <input
              type="number"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("userId")}
            />
            {errors.userId && (
              <div className="text-red-500">{errors.userId.message}</div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </label>
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </label>
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role:
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="block text-sm font-medium text-gray-700"
          >
            Restaurant ID:
            <input
              type="number"
              disabled={true}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            className="block text-sm font-medium text-gray-700"
          >
            Permissions:
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("permissions")}
            />
            {errors.permissions && (
              <div className="text-red-500">{errors.permissions.message}</div>
            )}
          </label>
        </div>
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
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
