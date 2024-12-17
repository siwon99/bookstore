import React from 'react';

type PaginationProps = {
  totalBooks: number;
  bookListPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalBooks,
  bookListPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / bookListPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    </>
  );
};

export default Pagination;