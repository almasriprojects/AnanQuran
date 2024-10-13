import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getChapterVerseCount } from "@/app/utils/quranDataUtils";

interface VerseRangeSelectorProps {
  selectedChapter: number;
  setSelectedChapter: (chapter: number) => void;
  startVerse: number;
  setStartVerse: (verse: number) => void;
  endVerse: number;
  setEndVerse: (verse: number) => void;
  rangeInput: string;
  setRangeInput: (input: string) => void;
  onSearch: () => void;
  onRangeInput: () => void;
}

const VerseRangeSelector: React.FC<VerseRangeSelectorProps> = ({
  selectedChapter,
  setSelectedChapter,
  startVerse,
  setStartVerse,
  endVerse,
  setEndVerse,
  rangeInput,
  setRangeInput,
  onSearch,
  onRangeInput
}) => {
  const chapters = Array.from({ length: 114 }, (_, i) => i + 1);
  const verseCount = getChapterVerseCount(selectedChapter);
  const verses = Array.from({ length: verseCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col space-y-4">
      {/* Align chapter, start verse, end verse and button in a row */}
      <div className="flex space-x-4"> {/* This ensures the elements are side by side */}
        <Select value={selectedChapter.toString()} onValueChange={(value) => setSelectedChapter(Number(value))}>
          <SelectTrigger className="w-full">
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
        <Select value={startVerse.toString()} onValueChange={(value) => setStartVerse(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Start Verse" />
          </SelectTrigger>
          <SelectContent>
            {verses.map((verse) => (
              <SelectItem key={verse} value={verse.toString()}>
                Verse {verse}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={endVerse.toString()} onValueChange={(value) => setEndVerse(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="End Verse" />
          </SelectTrigger>
          <SelectContent>
            {verses.map((verse) => (
              <SelectItem key={verse} value={verse.toString()}>
                Verse {verse}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={onSearch} className="w-full">Search</Button>
      </div>
      
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="e.g., 2:100-150"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={onRangeInput}>Search Range</Button>
      </div>
    </div>
  );
};

export default VerseRangeSelector;
