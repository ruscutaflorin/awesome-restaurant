import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number | null;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  limit: number;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  paginate,
  hasPreviousPage,
  hasNextPage,
  limit,
}) => {
  const router = useRouter();
  if (currentPage === null) {
    return null;
  }
  const buttonClickHandler = (newPage: number) => {
    paginate(newPage);
    router.push(`/restaurants/?offset=${newPage}&limit=${limit}`);
  };
  return (
    <div className="flex flex-row justify-evenly my-4">
      {currentPage > 0 && currentPage && (
        <button
          className="bg-zinc-800 text-white hover:bg-zinc-600 py-2 px-4 rounded-lg flex-1 mx-2"
          onClick={() => buttonClickHandler(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Previous Page
        </button>
      )}
      {currentPage < totalPages - 1 && (
        <button
          className="bg-zinc-800 text-white hover:bg-zinc-600 py-2 px-4 rounded-lg flex-1 mx-2"
          onClick={() => buttonClickHandler(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
