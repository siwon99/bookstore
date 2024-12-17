import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../services/bookservice';
import { Book } from '../types/bookTypes';

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: number }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const getBook = async () => {
      if (bookId) {
        const data = await fetchBookById(bookId);
        setBook(data);
      }
    };
    getBook();
  }, [bookId]);

  if (!book) {
    return <div>책을 불러오는 중입니다.</div>;
  }

  return (
    <div>
      <h1>제목: {book.title}</h1>
      <p>저자: {book.author}</p>
      <p>책 소개: {book.description}</p>
      <p>가격: {book.price}원</p>
    </div>
  );
};

export default BookDetail;