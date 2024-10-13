// src/components/SearchandExport/QuranSearchAndExport.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileSpreadsheet } from "lucide-react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { VerseData } from "@/app/types/QuranTypes";

type QuranSearchAndExportProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  fullQuranData: VerseData[];
};

const QuranSearchAndExport = ({
  searchTerm,
  setSearchTerm,
  rowsPerPage,
  setRowsPerPage,
  fullQuranData
}: QuranSearchAndExportProps) => {

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Quran Data');

    worksheet.columns = [
      { header: 'Chapter Name', key: 'Chapter_Name_AR', width: 20 },
      { header: 'Chapter Number', key: 'Chapter_Number', width: 15 },
      { header: 'Section Number', key: 'Verse_Section', width: 15 },
      { header: 'Verse Number', key: 'Verse_Number', width: 15 },
      { header: 'Verse Text (AR)', key: 'Verse_Text_1', width: 50 },
      { header: 'Verse Text (EN)', key: 'Verse_Text_2', width: 50 },
    ];

    fullQuranData.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `Complete_Quran_Data.xlsx`;
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-center w-full gap-4">
      <div className="relative w-full md:flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Button onClick={exportToExcel} className="w-full md:w-auto">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <div className="flex items-center">
        <label htmlFor="rowsPerPage" className="text-sm"></label>
        <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder={rowsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="6236">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuranSearchAndExport;