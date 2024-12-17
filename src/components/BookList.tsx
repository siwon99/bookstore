import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { fetchBook } from '../services/bookService';
import { Book } from '../types/bookTypes';
import './BookList.css'

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

  //검색어
  const handleSearch = (searchWord: string) => {
    setSearchBar(searchWord); 
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchWord.toLowerCase()) ||
          book.author.toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  };

  //한 페이지에 책 10권 계산
  const bookListPage = 10;
  const LastBookIndex = currentPage * bookListPage;
  const FirstBookIndex = LastBookIndex - bookListPage;
  const currentBook = filteredBooks.slice(FirstBookIndex, LastBookIndex);

  return (
    <>
      <div className="book-list-container">
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="book-card-container">
          {currentBook.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="pagination-container">
          <Pagination
            onPageChange={setCurrentPage}
            totalBook={filteredBooks.length}
            bookListPage={bookListPage}
            currentBook={currentBook}
          />
        </div>
      </div>
    </>
  );
};

export default BookList;