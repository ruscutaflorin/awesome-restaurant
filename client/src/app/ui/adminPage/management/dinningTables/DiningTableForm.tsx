import { DiningTable } from "@/app/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
type DiningTableFormProps = {
  diningTables: DiningTable;
  onClose: () => void;
  action?: string;
};

const schema = z.object({
  name: z.string().min(3).max(255),
  status: z.string().min(3).max(255),
  capacity: z.number().min(0),
  positionX: z.number().min(0),
  positionY: z.number().min(0),
});

type FormFields = z.infer<typeof schema>;

const DiningTableForm: React.FC<DiningTableFormProps> = ({
  diningTables,
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
      name: diningTables.name,
      status: diningTables.status,
      capacity: diningTables.capacity,
      positionX: diningTables.positionX,
      positionY: diningTables.positionY,
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
        className="w-96 p-4 bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <CloseIcon
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        />{" "}
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
            </label>
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
          </div>
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

export default DiningTableForm;
