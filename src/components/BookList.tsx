import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { fetchBook } from '../services/bookservice';
import { Book } from '../types/bookTypes';
import BookDetail from './BookDetail';
import './BookList.css';

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
    price: '',
    quantity: 1,
  });

  useEffect(() => {
    const getBook = async () => {
      const data = await fetchBook();
      setBooks(data);
      setFilteredBooks(data);
    };
    getBook();
  }, []);

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

  const bookListPage = 10;
  const LastBookIndex = currentPage * bookListPage;
  const FirstBookIndex = LastBookIndex - bookListPage;
  const currentBook = filteredBooks.slice(FirstBookIndex, LastBookIndex);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    const priceNumber = Number(newBook.price);
    const quantityNumber = Number(newBook.quantity);

    if (isNaN(priceNumber) || isNaN(quantityNumber)) {
      alert('가격과 수량은 숫자로 입력하세요!');
      return;
    }

    const newBookWithId = {
      id: getNextId(),
      ...newBook,
      price: priceNumber,
      quantity: quantityNumber
    };

    setBooks((prevBooks) => [...prevBooks, newBookWithId]);
    setFilteredBooks((prevFilteredBooks) => [...prevFilteredBooks, newBookWithId]);
    alert('새로운 책이 추가되었습니다!');
    
    setNewBook({
      title: '',
      author: '',
      description: '',
      price: 0,
      quantity: 1,
    });
  };

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
          <div className="admin-buttons-container">
            <div className="admin-buttons-one">
              <p>책 제목</p>
              <input
                type="text"
                placeholder="책 제목"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <p>책 저자</p>
              <input
                type="text"
                placeholder="책 저자"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <p>책 상세정보</p>
              <input
                type="text"
                placeholder="책 상세정보"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </div>
            <div className="admin-buttons-two">
              <p>책 가격</p>
              <input
                type="text"
                placeholder="책 가격"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              />
              <p>책 수량</p>
              <input
                type="text"
                placeholder="책 수량"
                value={newBook.quantity}
                onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
              />
            </div>
          </div>
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

      {isModalOpen && selectedBook && (
        <BookDetail 
          book={selectedBook} 
          onClose={handleCloseModal} 
          onRemove={(id) => {
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
            setFilteredBooks((prevFilteredBooks) => prevFilteredBooks.filter(book => book.id !== id));
          }} 
          onQuantityChange={(newQuantity) => {
            setBooks((prevBooks) =>
              prevBooks.map((b) =>
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