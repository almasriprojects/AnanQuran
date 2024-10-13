// src/components/VerseBeginsSearch/VerseBeginsSearchBar.tsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerseBeginsSearchBarProps {
  onSearch: (phrase: string) => void;
}

const VerseBeginsSearchBar: React.FC<VerseBeginsSearchBarProps> = ({ onSearch }) => {
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchPhrase);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        placeholder="Enter beginning of verse..."
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default VerseBeginsSearchBar;