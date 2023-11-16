// Pagination.tsx
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3;

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // "«" button
    buttons.push(
      <button
        key="<<"
        className="join-item btn"
        onClick={() => paginate(Math.max(1, currentPage - maxVisibleButtons))}
        disabled={currentPage <= 1}
      >
        «
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <input
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          type="radio"
          name="options"
          aria-label={i.toString()}
          defaultChecked={currentPage === i}
          onChange={() => paginate(i)}
        />
      );
    }

    // "»" button
    buttons.push(
      <button
        key=">>"
        className="join-item btn"
        onClick={() =>
          paginate(Math.min(totalPages, currentPage + maxVisibleButtons))
        }
        disabled={currentPage >= totalPages}
      >
        »
      </button>
    );

    return buttons;
  };

  return (
    <div className="join flex items-center justify-center">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
