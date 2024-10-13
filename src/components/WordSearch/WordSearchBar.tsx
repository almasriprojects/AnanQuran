// src/components/WordSearch/WordSearchBar.tsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WordSearchBarProps {
  onSearch: (word: string) => void;
}

const WordSearchBar: React.FC<WordSearchBarProps> = ({ onSearch }) => {
  const [searchWord, setSearchWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchWord);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder="Enter a word to search"
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default WordSearchBar;