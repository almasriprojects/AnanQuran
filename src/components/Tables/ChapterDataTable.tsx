// src/components/Dashboard/ChapterDataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VerseData } from "@/app/types/QuranTypes";

interface ChapterDataTableProps {
  data: VerseData[];
  startIndex?: number;
}

// ChapterDataTable component using shadcn table components
const ChapterDataTable: React.FC<ChapterDataTableProps> = ({ data, startIndex = 0 }) => {
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
            <TableCell className="text-right">{item.Verse_Text_1}</TableCell>
            <TableCell className="text-right">{item.Verse_Text_2}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChapterDataTable;