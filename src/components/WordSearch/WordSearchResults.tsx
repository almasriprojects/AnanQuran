// src/components/WordSearch/WordSearchResults.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WordSearchResult } from "@/app/utils/quranDataUtils";

interface WordSearchResultsProps {
  results: WordSearchResult;
}

const WordSearchResults: React.FC<WordSearchResultsProps> = ({ results }) => {
  const [dialogContent, setDialogContent] = useState<'all' | 'chapters' | 'sections'>('all');

  const renderTable = () => {
    switch (dialogContent) {
      case 'all':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Chapter Name</TableHead>
                <TableHead className="text-black">Chapter</TableHead>
                <TableHead className="text-black">Verse</TableHead>
                        <TableHead className="text-black">Arabic Text</TableHead>
                        <TableHead className="text-black">Arabic Text</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.verses.map((verse, index) => (
                <TableRow key={index}>
                  <TableCell className="text-black">{verse.Chapter_Name_AR}</TableCell>
                  <TableCell className="text-black">{verse.Verse_Chapter}</TableCell>
                  <TableCell className="text-black">{verse.Verse_Number}</TableCell>
                      <TableCell className="text-right text-black">{verse.Verse_Text_1}</TableCell>
                      <TableCell className="text-right text-black">{verse.Verse_Text_2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'chapters':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Chapter Number</TableHead>
                <TableHead className="text-black">Chapter Name</TableHead>
                <TableHead className="text-black">Occurrences</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.chapterOccurrences.map((chapter, index) => (
                <TableRow key={index}>
                  <TableCell className="text-black">{chapter.chapterNumber}</TableCell>
                  <TableCell className="text-black">{chapter.chapterName}</TableCell>
                  <TableCell className="text-black">{chapter.occurrences}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'sections':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Section Number</TableHead>
                <TableHead className="text-black">Occurrences</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.sectionOccurrences.map((section, index) => (
                <TableRow key={index}>
                  <TableCell className="text-black">{section.sectionNumber}</TableCell>
                  <TableCell className="text-black">{section.occurrences}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Total Occurrences</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogContent('all')}
                variant="link"
                className="text-4xl font-bold p-0"
              >
                {results.totalOccurrences}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">All Verses Containing the Word</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                {renderTable()}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Chapters</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogContent('chapters')}
                variant="link"
                className="text-4xl font-bold p-0"
              >
                {results.chapterOccurrences.length}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">Chapters Containing the Word</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                {renderTable()}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Sections</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogContent('sections')}
                variant="link"
                className="text-4xl font-bold p-0"
              >
                {results.sectionOccurrences.length}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">Sections Containing the Word</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                {renderTable()}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default WordSearchResults;