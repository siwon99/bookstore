import React from 'react';
import { Book } from '../types/bookTypes';

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookCard;