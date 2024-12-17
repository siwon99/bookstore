import React, { useState } from 'react';
import { addBook, removeBook, updateBookQuantity } from '../services/bookservice';
import { Book } from '../types/bookTypes';

export const Admin: React.FC = () => {
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(newBook);
      alert('책이 추가되었습니다!');
      setNewBook({
        id: 0,
        title: '',
        author: '',
        description: '',
        price: 0,
        quantity: 0,
      });
    } catch (error) {
      alert('책 추가 실패: ' + error);
    }
  };

  const handleRemoveBook = async (id: number) => {
    try {
      await removeBook(id.toString());
      alert('책을 삭제했습니다!');
    } catch (error) {
      alert('책 삭제 실패: ' + error);
    }
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      await updateBookQuantity(id.toString(), quantity);
      alert('책 수량이 업데이트되었습니다!');
    } catch (error) {
      alert('수량 업데이트 실패: ' + error);
    }
  };

  return (
    <div>
      <h2>책 추가하기</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="책 제목"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="책 저자"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="책 상세정보"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="책 가격"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="책 수량"
          value={newBook.quantity}
          onChange={(e) => setNewBook({ ...newBook, quantity: Number(e.target.value) })}
        />
        <button type="submit">책 추가</button>
      </form>

      <h2>책 삭제하기</h2>
      <input
        type="number"
        placeholder="책 ID 삭제"
        onChange={(e) => {
          const id = Number(e.target.value);
          if (!isNaN(id)) {
            handleRemoveBook(id);
          }
        }}
      />

      <h2>책 수량 업데이트</h2>
      <input
        type="number"
        placeholder="책 ID"
        onChange={(e) => {
          const id = Number(e.target.value);
          const quantity = prompt('수량을 입력해주세요:');
          if (!isNaN(id) && quantity) {
            handleQuantityChange(id, Number(quantity));
          }
        }}
      />
    </div>
  );
};

export default Admin;