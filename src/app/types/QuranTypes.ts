// src/app/types/QuranTypes.ts

export interface WordData {
  Word_Location: string;
  Word: string;
  Word_Total_Letter: number;
}

export interface VerseData {
  Chapter_Name_AR: string;
  Chapter_Number: number;
  Master_location: number;
  Verse_Section: number;
  Verse_Page: number;
  Verse_Chapter: number;
  Verse_Number: number;
  Verse_Location: string;
  Verse_Text_1: string;
  Verse_Text_2: string;
  Verse_Text_3: string;
  Verse_Text_4: string;
  Verse_Total_Word: number;
  Verse_Total_Letter: number;
  Words: {
    [key: string]: WordData;
  };
}

export interface ChapterInfo {
  Chapter_Number: number;
  Chapter_Name_AR: string;
  Chapter_Name_EN: string;
  Chapter_Total_Verses: number;
  Chapter_Total_Words: number;
  Chapter_Total_Letters: number;
  Verses: {
    [key: string]: VerseData;
  };
}

export interface QuranDataType {
  [key: string]: ChapterInfo;
}