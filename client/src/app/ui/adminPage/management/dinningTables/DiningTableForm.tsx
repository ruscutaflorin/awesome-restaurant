import { DiningTable } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { addDiningTable, editDiningTable } from "@/app/api/admin";
import { useAuthStore } from "@/app/store/user";

type DiningTableFormProps = {
  diningTables?: DiningTable;
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  id: z.coerce.number(),
  name: z.string().min(3).max(255),
  status: z.string().min(3).max(255),
  capacity: z.coerce.number(),
  positionX: z.coerce.number(),
  positionY: z.coerce.number(),
});

type FormFields = z.infer<typeof schema>;

const DiningTableForm: React.FC<DiningTableFormProps> = ({
  diningTables,
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
      id: diningTables?.id || 0,
      name: diningTables?.name || "",
      status: diningTables?.status || "Available",
      capacity: diningTables?.capacity || 0,
      positionX: diningTables?.positionX || 0,
      positionY: diningTables?.positionY || 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      if (restaurantId && token) {
        if (action === "edit") {
          const result = await editDiningTable(
            restaurantId,
            data.id,
            data.name,
            data.capacity,
            data.status,
            token
          );
          if (result === 200) {
            console.log("Updated successfully");
            onClose();
          }
        } else {
          const result = await addDiningTable(
            restaurantId,
            data.name,
            data.capacity,
            token
          );
          if (result === 200) {
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
        <h1 className="text-2xl font-semibold mb-4">Dining Table Form</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.name && (
              <div className="text-red-500">This field is required</div>
            )}
          </label>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
              <input
                {...register("status", { required: true })}
                type="text"
                id="status"
                disabled={action === "add" ? true : false}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.status && (
                <div className="text-red-500">This field is required</div>
              )}
            </label>
          </div>
          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-700"
            >
              Capacity:
              <input
                {...register("capacity", { required: true })}
                type="number"
                id="capacity"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.capacity && (
                <div className="text-red-500">This field is required</div>
              )}
            </label>
          </div>
          <div>
            <label
              htmlFor="positionX"
              className="block text-sm font-medium text-gray-700"
            >
              Position X:
              <input
                {...register("positionX", { required: true })}
                type="number"
                id="positionX"
                disabled={true}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.positionX && (
                <div className="text-red-500">This field is required</div>
              )}
            </label>
          </div>
          <div>
            <label
              htmlFor="positionY"
              className="block text-sm font-medium text-gray-700"
            >
              Position Y:
              <input
                {...register("positionY", { required: true })}
                type="number"
                id="positionY"
                disabled={true}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.positionY && (
                <div className="text-red-500">This field is required</div>
              )}
            </label>
          </div>
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

export default DiningTableForm;
