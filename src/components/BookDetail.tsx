// BookDetail.tsx
import React, { useState } from 'react';
import { Book } from '../types/bookTypes';
import './BookDetail.css';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onClose, onRemove, onQuantityChange }) => {
  const [newQuantity, setNewQuantity] = useState<number>(book.quantity);

  const handleUpdateQuantity = () => {
    onQuantityChange(book.id, newQuantity);
    alert('책 수량이 업데이트되었습니다!');
  };

  const handleDeleteBook = () => {
    alert("책을 삭제했습니다.");
    onRemove(book.id);
    onClose(); 
  };

  return (
    <div className="bookDetail-modal">
      <div className="bookDetail-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{book.title}</h2>
        <p><strong>저자:</strong> {book.author}</p>
        <p><strong>상세정보:</strong> {book.description}</p>
        <p><strong>가격:</strong> {book.price}원</p>
        <p><strong>현재 수량:</strong> {book.quantity}</p>

        <h3>책 수량 업데이트</h3>
        <input
          type="number"
          placeholder="새로운 수량"
          value={newQuantity}
          onChange={(e) => setNewQuantity(Number(e.target.value))}
        />
        <button className='bookDetail-updateBtn' onClick={handleUpdateQuantity}>업데이트</button>
        
        <h3>책 삭제하기</h3>
        <button className='bookDetail-removeBtn' onClick={handleDeleteBook}>삭제</button>
      </div>
    </div>
  );
};

export default BookDetail;