// src/components/VerseDisplay/VerseDisplay.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerseData } from "@/app/types/QuranTypes";

interface VerseDisplayProps {
  verse: VerseData;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chapter {verse.Chapter_Number}, Verse {verse.Verse_Number}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Arabic Text:</h3>
          <p className="text-right text-xl">{verse.Verse_Text_1}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Without Tashkeel:</h3>
          <p className="text-right text-xl">{verse.Verse_Text_2}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Additional Information:</h3>
          <p>Chapter Name: {verse.Chapter_Name_AR}</p>
          <p>Section: {verse.Verse_Section}</p>
          <p>Page: {verse.Verse_Page}</p>
          <p>Total Words: {verse.Verse_Total_Word}</p>
          <p>Total Letters: {verse.Verse_Total_Letter}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerseDisplay;