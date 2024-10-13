// src/app/(pages)/verse-begins/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import VerseBeginsDataTable from "@/components/Tables/VerseBeginsDataTable";
import Pagination from "@/components/Dashboard/Pagination";
import VerseBeginsSearchAndExport from "@/components/SearchandExport//VerseBeginsSearchAndExport";
import { VerseBeginResult, searchVerseBegins } from "@/app/utils/quranDataUtils";


export default function VerseBeginsPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [verseBeginsData, setVerseBeginsData] = useState<VerseBeginResult[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (searchTerm) {
      const results = searchVerseBegins(searchTerm);
      setVerseBeginsData(results);
      setCurrentPage(1);
    } else {
      setVerseBeginsData([]);
    }
  }, [searchTerm]);

  const filteredData = verseBeginsData;

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
          <h1 className="text-2xl font-bold mb-4">Verse Begins Search</h1>
          <VerseBeginsSearchAndExport
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            fullVerseData={verseBeginsData}
          />
          <VerseBeginsDataTable data={paginatedData}
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