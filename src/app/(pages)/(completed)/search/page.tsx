"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import QuranDataTable from "@/components/Tables/QuranDataTable";
import Pagination from "@/components/Dashboard/Pagination";
import QuranSearchAndExport from "@/components/SearchandExport/QuranSearchAndExport";
import { VerseData, QuranDataType, ChapterInfo } from "@/app/types/QuranTypes";
import QuranData from "@/app/data/DB_Quran_New.json";

const QuranDataTyped = QuranData as unknown as QuranDataType;

export default function CompleteQuranPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [quranData, setQuranData] = useState<VerseData[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const verses: VerseData[] = [];
    Object.entries(QuranDataTyped).forEach(([chapterKey, chapter]: [string, ChapterInfo]) => {
      Object.values(chapter.Verses).forEach((verse: VerseData) => {
        const updatedVerse: VerseData = {
          ...verse,
          Chapter_Name_AR: chapter.Chapter_Name_AR,
          Chapter_Number: parseInt(chapterKey, 10)
        };
        verses.push(updatedVerse);
      });
    });
    setQuranData(verses);
  }, []);

  const filteredData = quranData.filter(
    item =>
      item.Verse_Text_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Verse_Text_2.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex flex-col overflow-hidden">
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
        <QuranSearchAndExport
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          fullQuranData={quranData}
        />
        <QuranDataTable data={paginatedData}
          startIndex={(currentPage - 1) * rowsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
