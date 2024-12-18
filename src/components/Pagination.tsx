import React from 'react';
import './Pagination.css';

type PaginationProps = {
  totalBook: number;
  bookListPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalBook,
  bookListPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBook / bookListPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? 'current-page' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;