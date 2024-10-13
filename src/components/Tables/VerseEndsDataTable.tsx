// src/components/Tables/VerseEndsDataTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VerseEndResult } from "@/app/utils/quranDataUtils";

interface VerseEndsDataTableProps {
  data: VerseEndResult[];
}

const VerseEndsDataTable: React.FC<VerseEndsDataTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>سورة</TableHead>
          <TableHead>رقم الجزء</TableHead>
          <TableHead>رقم السورة</TableHead>
          <TableHead>رقم الآية</TableHead>
          <TableHead>الآية</TableHead>
          <TableHead>الآية من غير تشكيل</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((verse, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{verse.Chapter_Name_AR}</TableCell>
            <TableCell>{verse.Verse_Section}</TableCell>
            <TableCell>{verse.Chapter_Number}</TableCell>
            <TableCell>{verse.Verse_Number}</TableCell>
            <TableCell className="text-right">{verse.Verse_Text_1}</TableCell>
            <TableCell className="text-right">{verse.Verse_Text_2}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VerseEndsDataTable;