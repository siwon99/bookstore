// import { Book } from '../types/bookTypes';

// const BASE_URL = '/api/books';

// export const fetchBooks = async (): Promise<Book[]> => {
//   const response = await fetch(BASE_URL, {
//     headers: {
//       Accept: 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`<fetchBooks> HTTP error! status: ${response.status}`);
//   }

//   return await response.json();
// };

// export const fetchBookById = async (id: string): Promise<Book> => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     headers: {
//       Accept: 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`<fetchBookById> HTTP error! status: ${response.status}`);
//   }

//   return await response.json();
// };

// export const addBook = async (book: Book) => {
//   const response = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify(book),
//   });

//   if (!response.ok) {
//     throw new Error(`<addBook> HTTP error! status: ${response.status}`);
//   }

//   return await response.json();
// };

// export const removeBook = async (id: string) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       Accept: 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`<removeBook> HTTP error! status: ${response.status}`);
//   }
// };

// export const updateBookQuantity = async (id: string, quantity: number) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({ quantity }),
//   });

//   if (!response.ok) {
//     throw new Error(`<updateBookQuantity> HTTP error! status: ${response.status}`);
//   }
// };


//임시 데이터로 api 만들기
import { Book } from '../types/bookTypes';

// 목업 데이터
let books: Book[] = [
  { id: 1, title: "불멸의 이순신", author: "김탁환", description: "이순신 장군의 불멸의 역사", price: 15000, quantity: 10 },
  { id: 2, title: "자존감 수업", author: "윤홍균", description: "자존감을 높이는 방법을 알려주는 책", price: 12000, quantity: 5 },
  { id: 3, title: "백년을 살아보니", author: "박웅현", description: "인생의 다양한 이야기와 삶의 철학을 다룬 책", price: 16000, quantity: 8 },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "The story of Jay Gatsby and his doomed love for Daisy Buchanan.", price: 17000, quantity: 7 },
  { id: 5, title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarianism and surveillance.", price: 18000, quantity: 6 },
  { id: 6, title: "Pride and Prejudice", author: "Jane Austen", description: "A classic novel about love and social class in 19th-century England.", price: 15000, quantity: 12 },
  { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", description: "A story about a disillusioned teenager, Holden Caulfield, navigating adulthood.", price: 20000, quantity: 3 },
  { id: 8, title: "하버드대학을 간 간호사", author: "정은경", description: "하버드 대학을 다닌 간호사의 이야기를 담은 책", price: 14000, quantity: 4 },
  { id: 9, title: "어떻게 살 것인가", author: "유시민", description: "인생을 살아가는 방법에 대한 철학적 질문과 답을 다룬 책", price: 13000, quantity: 9 },
  { id: 10, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South of the United States.", price: 19000, quantity: 2 },
  { id: 11, title: "그릿", author: "앤젤라 더크워스", description: "꾸준함과 인내를 통한 성공의 힘을 이야기하는 책", price: 15000, quantity: 11 },
  { id: 12, title: "The Alchemist", author: "Paulo Coelho", description: "A philosophical novel about pursuing one's dreams and destiny.", price: 22000, quantity: 5 },
  { id: 13, title: "The Hobbit", author: "J.R.R. Tolkien", description: "A fantasy novel about the adventures of Bilbo Baggins.", price: 25000, quantity: 8 },
  { id: 14, title: "그럼에도 불구하고", author: "윤태호", description: "다양한 사회적 이슈를 다룬 에세이", price: 13000, quantity: 15 },
  { id: 15, title: "리틀 프린스", author: "앙투안 드 생텍쥐페리", description: "어린 왕자가 지구에 오며 펼쳐지는 이야기를 다룬 책", price: 11000, quantity: 20 },
  { id: 16, title: "안녕, 나의 집", author: "김애란", description: "각기 다른 사람들의 집에 대한 이야기", price: 14000, quantity: 10 },
  { id: 17, title: "The Picture of Dorian Gray", author: "Oscar Wilde", description: "A philosophical novel about vanity, morality, and the consequences of a life of excess.", price: 23000, quantity: 4 },
  { id: 18, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", description: "An exploration of how the human mind processes information and makes decisions.", price: 30000, quantity: 2 },
  { id: 19, title: "미움받을 용기", author: "기시미 이치로", description: "자기 계발을 위한 철학적인 질문을 던지는 책", price: 12000, quantity: 6 },
  { id: 20, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", description: "A philosophical novel that explores the depths of human nature, free will, and morality.", price: 25000, quantity: 5 },
  { id: 21, title: "설국", author: "미우라 시마", description: "일본의 추운 지방을 배경으로 한 감성적 소설", price: 18000, quantity: 3 },
  { id: 22, title: "백설공주에게 죽음을", author: "미나토 카나에", description: "한 여자의 복수극을 그린 스릴러 소설", price: 17000, quantity: 4 },
  { id: 23, title: "Frankenstein", author: "Mary Shelley", description: "A gothic novel about a scientist who creates a monster, and the consequences of his actions.", price: 20000, quantity: 7 },
  { id: 24, title: "한국사 시간여행", author: "이기범", description: "한국사의 중요한 사건들을 시간 여행 형식으로 설명하는 책", price: 13000, quantity: 8 },
  { id: 25, title: "The Road", author: "Cormac McCarthy", description: "A dystopian novel about a father and son surviving in a post-apocalyptic world.", price: 22000, quantity: 6 },
  { id: 26, title: "나미야 잡화점의 기적", author: "히가시노 게이고", description: "한 잡화점에서 벌어지는 기적 같은 이야기", price: 17000, quantity: 9 },
  { id: 27, title: "Catcher in the Rye", author: "J.D. Salinger", description: "A story about teenage rebellion, alienation, and mental health.", price: 18000, quantity: 5 },
  { id: 28, title: "어떤 하루", author: "김유정", description: "하루하루를 살아가는 사람들의 마음을 그린 작품", price: 12000, quantity: 10 },
  { id: 29, title: "Wuthering Heights", author: "Emily Brontë", description: "A dark and tragic story of love, passion, and revenge.", price: 21000, quantity: 3 },
  { id: 30, title: "자기 혁명", author: "이병헌", description: "자기 개발을 위한 혁명적인 접근을 제시하는 책", price: 13000, quantity: 12 },
  { id: 31, title: "데미안", author: "헤르만 헤세", description: "성장과 자아 발견의 이야기를 담은 소설", price: 15000, quantity: 8 },
  { id: 32, title: "Moby Dick", author: "Herman Melville", description: "A classic novel about Captain Ahab's obsession with hunting the white whale, Moby Dick.", price: 25000, quantity: 2 },
  { id: 33, title: "안녕, 나의 모든 것", author: "김혜나", description: "고통과 아픔을 이겨내는 과정에 대한 이야기", price: 11000, quantity: 15 },
  { id: 34, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", description: "The first book in the Harry Potter series, where Harry discovers his magical heritage.", price: 24000, quantity: 5 },
  { id: 35, title: "지금, 이 순간", author: "이광수", description: "매일의 삶 속에서 찾은 작은 행복을 이야기하는 에세이", price: 12000, quantity: 10 },
  { id: 36, title: "The Odyssey", author: "Homer", description: "An epic poem about the adventures of Odysseus as he tries to return home after the Trojan War.", price: 25000, quantity: 3 },
  { id: 37, title: "개미", author: "베르나르 베르베르", description: "인간과 개미의 세계를 비교하며 이야기를 풀어내는 소설", price: 13000, quantity: 7 },
  { id: 38, title: "스탠드", author: "스티븐 킹", description: "세계적인 전염병이 퍼진 후 살아남은 이들의 이야기를 그린 소설", price: 22000, quantity: 4 },
  { id: 39, title: "Brave New World", author: "Aldous Huxley", description: "A dystopian novel about a technologically advanced society that sacrifices individual freedom for happiness.", price: 23000, quantity: 5 },
  { id: 40, title: "내 마음을 다친 책", author: "강성태", description: "자기 개발을 위한 마음의 변화와 성장을 다룬 책", price: 14000, quantity: 10 },
  { id: 41, title: "돈의 감각", author: "김승호", description: "돈과 감각적인 삶에 대해 이야기하는 책", price: 12000, quantity: 6 },
  { id: 42, title: "The Art of War", author: "Sun Tzu", description: "An ancient Chinese military treatise on strategy and warfare.", price: 19000, quantity: 3 },
  { id: 43, title: "구르믈 버서난 달처럼", author: "박경리", description: "한국 역사 속 인물들의 이야기를 그린 소설", price: 16000, quantity: 5 },
  { id: 44, title: "The Count of Monte Cristo", author: "Alexandre Dumas", description: "A classic tale of revenge and redemption.", price: 22000, quantity: 4 },
  { id: 45, title: "해리포터와 비밀의 방", author: "J.K. Rowling", description: "The second book in the Harry Potter series, filled with magic, mystery, and adventure.", price: 23000, quantity: 6 },
  { id: 46, title: "사피엔스", author: "유발 하라리", description: "인류의 역사와 미래를 다룬 책", price: 25000, quantity: 8 },
  { id: 47, title: "노르웨이의 숲", author: "무라카미 하루키", description: "삶과 사랑, 상실에 관한 이야기를 그린 소설", price: 21000, quantity: 5 },
  { id: 48, title: "Jane Eyre", author: "Charlotte Brontë", description: "A classic novel about the life and challenges of Jane Eyre, an orphan who becomes a governess.", price: 23000, quantity: 4 },
  { id: 49, title: "The Hunger Games", author: "Suzanne Collins", description: "A dystopian novel where children fight to the death for survival in a televised event.", price: 21000, quantity: 6 },
  { id: 50, title: "조선왕조실록", author: "이병도", description: "조선 왕조의 역사와 사건을 담은 책", price: 27000, quantity: 2 }
];

//모든 책 가져오기
export const fetchBook = async (): Promise<Book[]> => {
  return books;
};

//ID로 책 가져오기
export const fetchBookById = async (id: number): Promise<Book | undefined> => {
  return books.find(book => book.id === id);
};

//책 추가하기
export const addBook = async (book: Book): Promise<Book> => {
  const newBook = { ...book, id: books.length + 1 };
  books.push(newBook);
  return newBook;
};

//책 삭제하기
export const removeBook = async (id: number): Promise<void> => {
  books = books.filter(book => book.id !== id);
  console.log(`Removed book with id: ${id}`);
};

//책 수량 업데이트하기
export const updateBookQuantity = async (id: number, quantity: number): Promise<void> => {
  const book = books.find(book => book.id === id);
  if (book) {
    book.quantity = quantity;
    console.log(`Updated book with id: ${id}, new quantity: ${quantity}`);
  }
};