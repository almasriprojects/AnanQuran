import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VerseData } from "@/app/types/QuranTypes";
import { Check } from 'lucide-react';

interface SectionDataTableProps {
  data: VerseData[];
  startIndex?: number;
}

const SectionDataTable: React.FC<SectionDataTableProps> = ({ data, startIndex = 0 }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset after 2 seconds
    });
  };

  const CopyableCell: React.FC<{ text: string }> = ({ text }) => (
    <TableCell 
      className="text-right cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleCopyClick(text)}
    >
      <div className="flex items-center justify-end space-x-2">
        <span>{text}</span>
        {copiedText === text && (
          <Check className="h-4 w-4 text-green-500" />
        )}
      </div>
    </TableCell>
  );

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
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell>{item.Chapter_Name_AR}</TableCell>
            <TableCell>{item.Verse_Section}</TableCell>
            <TableCell>{item.Chapter_Number}</TableCell>
            <TableCell>{item.Verse_Number}</TableCell>
            <CopyableCell text={item.Verse_Text_1} />
            <CopyableCell text={item.Verse_Text_2} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SectionDataTable;