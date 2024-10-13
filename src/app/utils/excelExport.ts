// src/app/utils/excelExport.ts
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { VerseBeginResult } from './quranDataUtils';

export const exportToExcel = (data: VerseBeginResult[], filename: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Verse Begins Results');

  worksheet.columns = [
    { header: 'سورة', key: 'Chapter_Name_AR', width: 20 },
    { header: 'رقم الجزء', key: 'Verse_Section', width: 10 },
    { header: 'رقم السورة', key: 'Chapter_Number', width: 10 },
    { header: 'رقم الآية', key: 'Verse_Number', width: 10 },
    { header: 'الآية', key: 'Verse_Text_1', width: 50 },
    { header: 'الآية من غير تشكيل', key: 'Verse_Text_2', width: 50 },
  ];

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
  });
};


