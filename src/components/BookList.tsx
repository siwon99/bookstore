import React, { useEffect, useState } from 'react';
import { BookCard } from './BookCard';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { fetchBook } from '../services/bookservice';
import { Book } from '../types/bookTypes';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const getBook = async () => {
      const data = await fetchBook();
      setBooks(data);
      setFilteredBooks(data);
    };
    getBook();
  }, []);

  return (
    <>
      <BookCard />
      <Pagination />
      <SearchBar />
    </>
  );
};

export default { BookList };