// src/components/VerseBeginsSearch/VerseBeginsResults.tsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VerseBeginResult } from "@/app/utils/quranDataUtils";
import { exportToExcel } from "@/app/utils/excelExport";

interface VerseBeginsResultsProps {
  results: VerseBeginResult[];
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
}

const VerseBeginsResults: React.FC<VerseBeginsResultsProps> = ({ results, rowsPerPage, setRowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(results.length / rowsPerPage);
  const paginatedResults = results.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleExport = () => {
    exportToExcel(results, 'Verse_Begins_Results');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleExport}>Export to Excel</Button>
        <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>سورة</TableHead>
            <TableHead>رقم الجزء</TableHead>
            <TableHead>رقم السورة</TableHead>
            <TableHead>رقم الآية</TableHead>
            <TableHead>الآية</TableHead>
            <TableHead>الآية من غير تشكيل</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedResults.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.Chapter_Name_AR}</TableCell>
              <TableCell>{result.Verse_Section}</TableCell>
              <TableCell>{result.Chapter_Number}</TableCell>
              <TableCell>{result.Verse_Number}</TableCell>
              <TableCell className="text-right">{result.Verse_Text_1}</TableCell>
              <TableCell className="text-right">{result.Verse_Text_2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VerseBeginsResults;