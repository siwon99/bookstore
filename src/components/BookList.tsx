import React, { useState } from 'react';
import { BookCard } from './BookCard';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';

const BookList: React.FC = () => {
  const [books, setBooks] = useState([]); //전체 책
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBar, setSearchBar] = useState('');

  return (
    <>
      <BookCard />
      <Pagination />
      <SearchBar />
    </>
  );
};

export default { BookList };