// src/app/(pages)/verse-range/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import VerseRangeSelector from "@/components/VerseRange/VerseRangeSelector";
import VerseRangeDataTable from "@/components/Tables/VerseRangeDataTable";
import Pagination from "@/components/Dashboard/Pagination";
import { VerseData, getVersesFromRange } from "@/app/utils/quranDataUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function VerseRangePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [startVerse, setStartVerse] = useState<number>(1);
  const [endVerse, setEndVerse] = useState<number>(1);
  const [rangeInput, setRangeInput] = useState<string>("");
  const [verseData, setVerseData] = useState<VerseData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(50);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSearch = () => {
    const verses = getVersesFromRange(selectedChapter, startVerse, endVerse);
    setVerseData(verses);
    setCurrentPage(1);
  };

  const handleRangeInput = () => {
    const match = rangeInput.match(/(\d+):(\d+)-(\d+)/);
    if (match) {
      const [, chapter, start, end] = match.map(Number);
      setSelectedChapter(chapter);
      setStartVerse(start);
      setEndVerse(end);
      const verses = getVersesFromRange(chapter, start, end);
      setVerseData(verses);
      setCurrentPage(1);
    }
  };

  const pageCount = Math.ceil(verseData.length / rowsPerPage);
  const paginatedData = verseData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4">
          <h1 className="text-2xl font-bold mb-4">Verse Range Search</h1>
          <div className="flex flex-col space-y-4">
            <VerseRangeSelector
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
              startVerse={startVerse}
              setStartVerse={setStartVerse}
              endVerse={endVerse}
              setEndVerse={setEndVerse}
              rangeInput={rangeInput}
              setRangeInput={setRangeInput}
              onSearch={handleSearch}
              onRangeInput={handleRangeInput}
            />
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <VerseRangeDataTable
            data={paginatedData} 
            startIndex={(currentPage - 1) * rowsPerPage}
          /> 
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}