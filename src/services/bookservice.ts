import { Book } from '../types/bookTypes';

const BASE_URL = '/api/books';

export const fetchBook = async (): Promise<Book[]> => {
  const response = await fetch(BASE_URL);
  return await response.json();
};