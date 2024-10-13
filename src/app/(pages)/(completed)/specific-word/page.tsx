"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import WordSearchBar from "@/components/WordSearch/WordSearchBar";
import WordSearchResults from "@/components/WordSearch/WordSearchResults";
import { searchWord, WordSearchResult } from "@/app/utils/quranDataUtils";


export default function WordSearchPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [searchResults, setSearchResults] = useState<WordSearchResult | null>(null);

  const handleSearch = (word: string) => {
    const results = searchWord(word);
    setSearchResults(results);
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
          <h1 className="text-3xl font-bold mb-6">Specific Word Search</h1>
          <WordSearchBar onSearch={handleSearch} />
          {searchResults && <WordSearchResults results={searchResults} />}
        </main>
      </div>
    </div>
  );
}