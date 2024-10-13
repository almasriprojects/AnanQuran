// src/components/VerseSelector/VerseSelector.tsx
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getChapter } from "@/app/utils/quranDataUtils";

interface VerseSelectorProps {
  selectedChapter: number;
  setSelectedChapter: (chapter: number) => void;
  selectedVerse: number;
  setSelectedVerse: (verse: number) => void;
  directInput: string;
  setDirectInput: (input: string) => void;
  onDirectInputSubmit: (input: string) => void;
}

const VerseSelector: React.FC<VerseSelectorProps> = ({
  selectedChapter,
  setSelectedChapter,
  selectedVerse,
  setSelectedVerse,
  directInput,
  setDirectInput,
  onDirectInputSubmit
}) => {
  const [chapters, setChapters] = useState<number[]>([]);
  const [verses, setVerses] = useState<number[]>([]);

  useEffect(() => {
    const chapterNumbers = Array.from({ length: 114 }, (_, i) => i + 1);
    setChapters(chapterNumbers);
  }, []);

  useEffect(() => {
    const chapter = getChapter(selectedChapter);
    if (chapter) {
      const verseNumbers = Array.from({ length: chapter.Chapter_Total_Verses }, (_, i) => i + 1);
      setVerses(verseNumbers);
    }
  }, [selectedChapter]);

  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-center w-full gap-4">
      <Select value={selectedChapter.toString()} onValueChange={(value) => setSelectedChapter(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Chapter" />
        </SelectTrigger>
        <SelectContent>
          {chapters.map((chapter) => (
            <SelectItem key={chapter} value={chapter.toString()}>
              Chapter {chapter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedVerse.toString()} onValueChange={(value) => setSelectedVerse(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Verse" />
        </SelectTrigger>
        <SelectContent>
          {verses.map((verse) => (
            <SelectItem key={verse} value={verse.toString()}>
              Verse {verse}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="e.g., 2:136"
          value={directInput}
          onChange={(e) => setDirectInput(e.target.value)}
        />
        <Button onClick={() => onDirectInputSubmit(directInput)}>Go</Button>
      </div>
    </div>
  );
};

export default VerseSelector;