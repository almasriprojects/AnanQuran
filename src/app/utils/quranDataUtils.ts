import { QuranDataType, ChapterInfo, VerseData } from "@/app/types/QuranTypes";
import QuranData from "@/app/data/DB_Quran_New.json";

// Export VerseData type
export type { VerseData } from "@/app/types/QuranTypes";

// Define a type for the raw data structure
interface RawQuranData {
  [key: string]: Omit<ChapterInfo, 'Chapter_Number'>;
}

// Function to transform imported data to match QuranDataType
function transformQuranData(data: RawQuranData): QuranDataType {
  const transformedData: QuranDataType = {};
  Object.entries(data).forEach(([chapterNumber, chapterData]) => {
    transformedData[parseInt(chapterNumber)] = {
      ...chapterData,
      Chapter_Number: parseInt(chapterNumber),
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
