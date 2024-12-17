import { Book } from '../types/bookTypes';

const BASE_URL = '/api/books';

// 책 정보 가져오기
export const fetchBook = async (): Promise<Book[]> => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

// 책 ID 가져오기
export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
};