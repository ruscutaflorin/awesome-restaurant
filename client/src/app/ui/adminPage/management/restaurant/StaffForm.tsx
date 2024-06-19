"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { addStaff, editStaff } from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";
import { StaffUserDetailed } from "@/app/types/types";

type StaffFormProps = {
  staffUsers?: StaffUserDetailed;
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  userId: z.coerce.number().min(1).optional(),
  staffUserId: z.coerce.number().min(1).optional(),
  name: z.string().min(3).max(255),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  restaurantId: z.coerce.number().min(1),
  role: z.string().min(3).max(255),
  permissions: z.string().min(3).max(255),
});
type FormFields = z.infer<typeof schema>;

const StaffForm: React.FC<StaffFormProps> = ({
  staffUsers,
  onClose,
  action,
}) => {
  const restaurantId = useAuthStore((state) => state.user.restaurantId);
  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      userId: staffUsers?.id,
      staffUserId: staffUsers?.userId,
      name: staffUsers?.name || "Albert",
      email: "test@yahoo.com",
      password: "parola1234",
      restaurantId: restaurantId || 0,
      role: staffUsers?.role || "Servitor",
      permissions: staffUsers?.permissions.join(",") || "WIFI",
    },
    resolver: zodResolver(schema),
  });
  console.log(staffUsers);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (action === "edit") {
        console.log(
          data.userId,
          data.staffUserId,
          data.restaurantId,
          data.name,
          data.role,
          token
        );
        const result = await editStaff(
          data.userId!,
          data.staffUserId!,
          data.restaurantId,
          data.name,
          data.role,
          token
        );
        if (result === 200) {
          console.log("Edited successfully");
          onClose();
        }
      } else {
        const result = await addStaff(
          data.name,
          data.email!,
          data.password!,
          data.restaurantId,
          data.role,
          data.permissions,
          token
        );
        if (result === 200) {
          console.log("Added successfully");
          onClose();
        }
      }
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: "An error occurred while submitting the form.",
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
        <h1 className="text-2xl font-semibold mb-4">Staff Form</h1>

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
        {action === "add" && (
          <>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
                <input
                  type="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </label>
            </div>
          </>
        )}
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("restaurantId")}
              readOnly
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
