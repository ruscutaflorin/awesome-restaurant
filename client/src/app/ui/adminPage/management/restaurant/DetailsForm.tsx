"use client";
import { Restaurant } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type restaurantDetailsProps = {
  restaurant: Restaurant;
  action?: string;
};

const schema = z.object({
  name: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  businessHours: z.string().min(3).max(255),
  contact: z.string().min(3).max(255),
});

type FormFields = z.infer<typeof schema>;

const DetailsForm: React.FC<restaurantDetailsProps> = ({
  restaurant,
  action,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: restaurant.name,
      address: restaurant.address,
      location: restaurant.location,
      businessHours: restaurant.businessHours.join(", "),
      contact: restaurant?.contact ?? "",
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
    <div className="flex justify-center items-center h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-4 bg-white rounded-lg shadow-md w-full"
      >
        <h1 className="text-2xl font-semibold mb-4">Restaurant Details</h1>
        <div className="flex flex-column w-full">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("address")}
            />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("location")}
            />
            {errors.location && (
              <div className="text-red-500">{errors.location.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessHours"
              className="block text-sm font-medium text-gray-700"
            >
              Business Hours
            </label>
            <input
              type="text"
              id="businessHours"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("businessHours")}
            />
            {errors.businessHours && (
              <div className="text-red-500">{errors.businessHours.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register("contact")}
            />
            {errors.contact && (
              <div className="text-red-500">{errors.contact.message}</div>
            )}
          </div>
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

export default DetailsForm;
