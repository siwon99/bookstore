import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookList } from './components/BookList';
import { BookDetail } from './components/BookDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;