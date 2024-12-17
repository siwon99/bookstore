import React from 'react';
import { Book } from '../types/bookTypes';
import './BookCard.css';

type BookCardProps = {
  book: Book;
  onClick: () => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onClick}) => {
  return (
    <div className="bookCard" onClick={onClick}>
      <h3>제목: {book.title}</h3>
      <p>저자: {book.author}</p>
      <p>상세정보: {book.description}</p>
      <p>가격: {book.price}</p>
      <p>수량: {book.quantity}</p>
    </div>
  );
};

export default BookCard;