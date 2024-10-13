// src/components/SearchandExport/VerseEndsSearchAndExport.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileSpreadsheet } from "lucide-react";
import { exportToExcel } from "@/app/utils/excelExport";
import { VerseEndResult } from "@/app/utils/quranDataUtils";

type VerseEndsSearchAndExportProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  fullVerseData: VerseEndResult[];
};

const VerseEndsSearchAndExport: React.FC<VerseEndsSearchAndExportProps> = ({
  searchTerm,
  setSearchTerm,
  rowsPerPage,
  setRowsPerPage,
  fullVerseData
}) => {

  const exportToExcelHandler = () => {
    exportToExcel(fullVerseData, `Verse_Ends_${searchTerm}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
      <div className="relative w-full sm:w-auto sm:flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search verse ending..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full sm:w-auto">
        <Button onClick={exportToExcelHandler} className="w-full sm:w-auto">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
        <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={rowsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VerseEndsSearchAndExport;