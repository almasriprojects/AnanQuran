import { QuranDataType, ChapterInfo, VerseData, WordData } from "@/app/types/QuranTypes";
import QuranData from "@/app/data/DB_Quran_New.json";

// Export VerseData type
export type { VerseData } from "@/app/types/QuranTypes";

// Define a type for the raw verse data structure
interface RawVerseData {
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
  Words: Record<string, unknown>;
}

// Define a type for the raw chapter data structure
interface RawChapterData {
  Chapter_Name_AR: string;
  Chapter_Name_EN: string;
  Chapter_Total_Verses: number;
  Chapter_Total_Words: number;
  Chapter_Total_Letters: number;
  Verses: Record<string, RawVerseData>;
}

// Define a type for the raw Quran data structure
interface RawQuranData {
  [key: string]: RawChapterData;
}

// Function to transform imported data to match QuranDataType
function transformQuranData(data: RawQuranData): QuranDataType {
  const transformedData: QuranDataType = {};
  Object.entries(data).forEach(([chapterNumber, chapterData]) => {
    const transformedVerses: Record<string, VerseData> = {};
    Object.entries(chapterData.Verses).forEach(([verseKey, verseData]) => {
      transformedVerses[verseKey] = {
        ...verseData,
        Chapter_Name_AR: chapterData.Chapter_Name_AR,
        Chapter_Number: parseInt(chapterNumber),
        Words: Object.fromEntries(
          Object.entries(verseData.Words).map(([key, value]) => [key, value as WordData])
        ),
      };
    });

    transformedData[parseInt(chapterNumber)] = {
      ...chapterData,
      Chapter_Number: parseInt(chapterNumber),
      Verses: transformedVerses,
    };
  });
  return transformedData;
}

const quranData: QuranDataType = transformQuranData(QuranData as RawQuranData);

export interface ChapterOccurrence {
  chapterNumber: number;
  chapterName: string;
  occurrences: number;
}

export interface SectionOccurrence {
  sectionNumber: number;
  occurrences: number;
}

export interface WordSearchResult {
  totalOccurrences: number;
  verses: VerseData[];
  chapterOccurrences: ChapterOccurrence[];
  sectionOccurrences: SectionOccurrence[];
}

export interface VerseBeginResult extends VerseData {
  Chapter_Name_AR: string;
}

export interface VerseEndResult extends VerseData {
  Chapter_Name_AR: string;
}

export const searchWord = (word: string): WordSearchResult => {
  const result: WordSearchResult = {
    totalOccurrences: 0,
    verses: [],
    chapterOccurrences: [],
    sectionOccurrences: [],
  };

  const chaptersMap = new Map<number, ChapterOccurrence>();
  const sectionsMap = new Map<number, SectionOccurrence>();

  Object.entries(quranData).forEach(([chapterNumber, chapter]) => {
    let chapterOccurrences = 0;
    Object.values(chapter.Verses).forEach((verse) => {
      if (verse.Verse_Text_1.includes(word) || verse.Verse_Text_2.includes(word)) {
        result.totalOccurrences++;
        result.verses.push({
          ...verse,
          Chapter_Name_AR: chapter.Chapter_Name_AR,
          Chapter_Number: parseInt(chapterNumber, 10),
        });
        chapterOccurrences++;

        // Update section occurrences
        const sectionOccurrence = sectionsMap.get(verse.Verse_Section) || { sectionNumber: verse.Verse_Section, occurrences: 0 };
        sectionOccurrence.occurrences++;
        sectionsMap.set(verse.Verse_Section, sectionOccurrence);
      }
    });

    if (chapterOccurrences > 0) {
      chaptersMap.set(parseInt(chapterNumber, 10), {
        chapterNumber: parseInt(chapterNumber, 10),
        chapterName: chapter.Chapter_Name_AR,
        occurrences: chapterOccurrences,
      });
    }
  });

  result.chapterOccurrences = Array.from(chaptersMap.values());
  result.sectionOccurrences = Array.from(sectionsMap.values());

  return result;
};

export const searchVerseBegins = (phrase: string): VerseBeginResult[] => {
  const results: VerseBeginResult[] = [];
  
  Object.entries(quranData).forEach(([chapterNumber, chapter]) => {
    Object.values(chapter.Verses).forEach((verse) => {
      if (verse.Verse_Text_1.startsWith(phrase) || verse.Verse_Text_2.startsWith(phrase)) {
        results.push({
          ...verse,
          Chapter_Name_AR: chapter.Chapter_Name_AR,
          Chapter_Number: parseInt(chapterNumber, 10),
        });
      }
    });
  });

  return results;
};

export const searchVerseEnds = (phrase: string): VerseEndResult[] => {
  const results: VerseEndResult[] = [];
  
  Object.entries(quranData).forEach(([chapterNumber, chapter]) => {
    Object.values(chapter.Verses).forEach((verse) => {
      if (verse.Verse_Text_1.endsWith(phrase) || verse.Verse_Text_2.endsWith(phrase)) {
        results.push({
          ...verse,
          Chapter_Name_AR: chapter.Chapter_Name_AR,
          Chapter_Number: parseInt(chapterNumber, 10),
        });
      }
    });
  });

  return results;
};

export const getChapter = (chapterNumber: number): ChapterInfo | undefined => {
  return quranData[chapterNumber.toString()];
};

export const getVerse = (chapterNumber: number, verseKey: string): VerseData | undefined => {
  const chapter = quranData[chapterNumber.toString()];
  return chapter?.Verses[verseKey] as VerseData;
};

export const getVersesFromChapter = (chapterNumber: number): VerseData[] => {
  const chapter = getChapter(chapterNumber);
  return chapter ? Object.values(chapter.Verses) as VerseData[] : [];
};

export const searchVersesByText = (searchText: string): VerseData[] => {
  const verses: VerseData[] = [];
  Object.entries(quranData).forEach(([chapterNumber, chapter]) => {
    Object.values(chapter.Verses).forEach((verse) => {
      const typedVerse = verse as VerseData;
      if (
        typedVerse.Verse_Text_1.includes(searchText) ||
        typedVerse.Verse_Text_2.includes(searchText)
      ) {
        verses.push({
          ...typedVerse,
          Chapter_Name_AR: chapter.Chapter_Name_AR,
          Chapter_Number: parseInt(chapterNumber, 10),
        });
      }
    });
  });
  return verses;
};

// New functions for Verse Range functionality

export const getChapterVerseCount = (chapterNumber: number): number => {
  const chapter = quranData[chapterNumber.toString()];
  return chapter ? Object.keys(chapter.Verses).length : 0;
};

export const getVersesFromRange = (chapterNumber: number, startVerse: number, endVerse: number): VerseData[] => {
  const chapter = quranData[chapterNumber.toString()];
  if (!chapter) return [];

  const verses: VerseData[] = [];
  for (let i = startVerse; i <= endVerse; i++) {
    const verse = chapter.Verses[`${chapterNumber}:${i}`];
    if (verse) {
      verses.push({
        ...verse,
        Chapter_Name_AR: chapter.Chapter_Name_AR,
        Chapter_Number: chapterNumber,
      });
    }
  }
  return verses;
};
