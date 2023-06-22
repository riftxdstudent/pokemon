import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  return (
    <div className="join flex justify-center my-8">
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button className="join-item btn" disabled>
        Page {currentPage}
      </button>
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
