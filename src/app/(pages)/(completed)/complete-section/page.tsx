"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SectionDataTable from "@/components/Tables/SectionDataTable";
import Pagination from "@/components/Dashboard/Pagination";
import SectionSearchAndExport from "@/components/SearchandExport/SectionSearchAndExport";
import SectionDropdown from "@/components/DropdownMenu/SectionDropdown";
import { VerseData, QuranDataType, ChapterInfo } from "@/app/types/QuranTypes";
import QuranData from "@/app/data/DB_Quran_New.json";

const QuranDataTyped = QuranData as QuranDataType;


export default function CompleteSectionPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [sectionData, setSectionData] = useState<VerseData[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const verses: VerseData[] = [];
    Object.entries(QuranDataTyped).forEach(([chapterKey, chapter]: [string, ChapterInfo]) => {
      Object.values(chapter.Verses).forEach((verse: VerseData) => {
        if (verse.Verse_Section === selectedSection) {
          const updatedVerse: VerseData = {
            ...verse,
            Chapter_Name_AR: chapter.Chapter_Name_AR,
            Chapter_Number: parseInt(chapterKey, 10)
          };
          verses.push(updatedVerse);
          console.log("Added verse:", updatedVerse); // Debug log
        }
      });
    });
    console.log(`Total verses for section ${selectedSection}:`, verses.length); // Debug log
    setSectionData(verses);
  }, [selectedSection]);

  const filteredData = sectionData.filter(
    item =>
      item.Verse_Text_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Verse_Text_2.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  console.log("Paginated data:", paginatedData); // Debug log

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
          <SectionDropdown
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <SectionSearchAndExport
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            selectedSection={selectedSection}
            fullSectionData={sectionData}
          />
          <SectionDataTable data={paginatedData}
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