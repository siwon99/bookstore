import React from 'react';
import { Book } from '../types/bookTypes';

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div>
      <h3>제목: {book.title}</h3>
      <p>저자: {book.author}</p>
      <p>상세정보: {book.description}</p>
    </div>
  );
};

export default BookCard;