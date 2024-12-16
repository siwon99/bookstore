import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void; 
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchWord, setSearchWord] = useState(''); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <input
      type="text"
      placeholder="책 제목/저자를 입력하세요" 
      value={searchWord}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;