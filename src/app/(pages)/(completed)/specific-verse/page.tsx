"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import VerseDisplay from "@/components/VerseDisplay/VerseDisplay";
import VerseSelector from "@/components/VerseSelector/VerseSelector";
import { VerseData } from "@/app/types/QuranTypes";
import { getChapter, getVerse } from "@/app/utils/quranDataUtils";


export default function SpecificVersePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(1);
  const [directInput, setDirectInput] = useState<string>("");
  const [currentVerse, setCurrentVerse] = useState<VerseData | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const chapter = getChapter(selectedChapter);
    const verse = getVerse(selectedChapter, `${selectedChapter}:${selectedVerse}`);
    if (chapter && verse) {
      setCurrentVerse({
        ...verse,
        Chapter_Name_AR: chapter.Chapter_Name_AR
      });
    }
  }, [selectedChapter, selectedVerse]);

  const handleDirectInput = (input: string) => {
    const [chapter, verse] = input.split(':').map(Number);
    if (chapter && verse) {
      const chapterData = getChapter(chapter);
      const verseData = getVerse(chapter, `${chapter}:${verse}`);
      if (chapterData && verseData) {
        setSelectedChapter(chapter);
        setSelectedVerse(verse);
        setCurrentVerse({
          ...verseData,
          Chapter_Name_AR: chapterData.Chapter_Name_AR
        });
      }
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
          <VerseSelector
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
            selectedVerse={selectedVerse}
            setSelectedVerse={setSelectedVerse}
            directInput={directInput}
            setDirectInput={setDirectInput}
            onDirectInputSubmit={handleDirectInput}
          />
          {currentVerse && <VerseDisplay verse={currentVerse} />}
        </main>
      </div>
    </div>
  );
}