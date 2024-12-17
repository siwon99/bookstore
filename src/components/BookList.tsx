import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { fetchBook } from '../services/bookservice';
import { Book } from '../types/bookTypes';
import BookDetail from './BookDetail';
import './BookList.css'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBar, setSearchBar] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    description: '',
    price: 0,
    quantity: 1,
  });

  useEffect(() => {
    const getBook = async () => {
      const data = await fetchBook();
      console.log(data);
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

  //모달 열고 닫기
  const handleBookClick = (book : Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  //책 추가
  const handleAddBook = () => {
    const newBookWithId = {
      id: getNextId(),
      ...newBook
    };
    setBooks((prevBooks) => [...prevBooks, newBookWithId]);
    setFilteredBooks((prevFilteredBooks) => [...prevFilteredBooks, newBookWithId]);
    
    setNewBook({
      title: '',
      author: '',
      description: '',
      price: 0,
      quantity: 1,
    });
  };

  //책 추가시 id부여
  const getNextId = () => {
    if (books.length === 0) return 1; 
    return Math.max(...books.map(book => book.id)) + 1; 
  };

  return (
    <>
      <div className="bookList-container">
        <div className="searchBar-container">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="admin-buttons">
          <h2>책 추가하기</h2>
          <input
            type="text"
            placeholder="책 제목을 입력하세요."
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="책 저자를 입력하세요."
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="책 상세정보를 입력하세요."
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="책 가격을 입력하세요."
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="책 수량을 입력하세요."
            value={newBook.quantity}
            onChange={(e) => setNewBook({ ...newBook, quantity: Number(e.target.value) })}
          />
          <button onClick={handleAddBook}>추가하기</button>
        </div>

        <div className="bookCard-container">
          {currentBook.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />
          ))}
        </div>
        <div className="pagination-container">
          <Pagination
            onPageChange={setCurrentPage}
            totalBook={filteredBooks.length}
            bookListPage={bookListPage}
            currentPage={currentPage}
          />
        </div>
      </div>

      {selectedBook && (
        <BookDetail 
          book={selectedBook} 
          onClose={handleCloseModal} 
          onRemove={handleRemoveBook} 
          onQuantityChange={(newQuantity) => {
            setBooks((prevBooks) =>
              prevBooks.map((b) =>
                b.id === selectedBook.id ? { ...b, quantity: newQuantity } : b
              )
            );
            setFilteredBooks((prevFilteredBooks) =>
              prevFilteredBooks.map((b) =>
                b.id === selectedBook.id ? { ...b, quantity: newQuantity } : b
              )
            );
          }}
        />
      )}
    </>
  );
};

export default BookList;