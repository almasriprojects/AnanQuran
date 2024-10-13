// src/app/(pages)/complete-chapter/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ChapterDataTable from "@/components/Tables/ChapterDataTable";
import Pagination from "@/components/Dashboard/Pagination";
import ChapterSearchAndExport from "@/components/SearchandExport/ChapterSearchAndExport";
import ChapterDropdown from "@/components/DropdownMenu/ChapterDropdown";
import { VerseData, QuranDataType } from "@/app/types/QuranTypes";
import QuranData from "@/app/data/DB_Quran_New.json";

// Cast the JSON data to the defined TypeScript type
const QuranDataTyped = QuranData as unknown as QuranDataType;

export default function CompleteChapterPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [chapterData, setChapterData] = useState<VerseData[]>([]);
  const [chapterName, setChapterName] = useState<string>("");

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // Update chapter data when selectedChapter changes
  useEffect(() => {
    const chapterInfo = QuranDataTyped[selectedChapter];

    if (chapterInfo) {
      const verses = Object.values(chapterInfo.Verses).map(verse => ({
        ...verse,
        Chapter_Name_AR: chapterInfo.Chapter_Name_AR,
        Chapter_Number: selectedChapter,
      }));

      setChapterData(verses);
      setChapterName(chapterInfo.Chapter_Name_EN);
    }
  }, [selectedChapter]);

  // Filter chapter data based on the search term
  const filteredData = chapterData.filter(
    (item) =>
      item.Verse_Text_1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Verse_Text_2?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
          <ChapterDropdown
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
          />
          <ChapterSearchAndExport
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            selectedChapter={selectedChapter}
            chapterName={chapterName}
            fullChapterData={chapterData}
          />
          <ChapterDataTable
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
