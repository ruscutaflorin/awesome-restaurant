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
    return;
  }
  const buttonClickHandler = (newPage: number) => {
    paginate(newPage);
    router.push(`/restaurants/?offset=${newPage}&limit=${limit}`);
  };
  return (
    <div className="flex flex-row justify-evenly">
      {currentPage > 0 && currentPage && (
        <button
          className="join-item btn btn-outline start-0 flex-1"
          onClick={() => buttonClickHandler(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Previous page
        </button>
      )}
      {currentPage < totalPages - 1 && (
        <button
          className="join-item btn btn-outline end-0 flex-1"
          onClick={() => buttonClickHandler(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
