// components/Dashboard/ChapterDropdown.js

import React from "react";

const ChapterDropdown = ({ selectedChapter, setSelectedChapter }) => {
  const chapters = Array.from({ length: 114 }, (_, i) => i + 1);

  return (
    <div className="mb-4">
      <label htmlFor="chapterDropdown" className="mr-2">Select Chapter:</label>
      <select
        id="chapterDropdown"
        value={selectedChapter}
        onChange={(e) => setSelectedChapter(e.target.value)}
        className="p-2 border rounded"
      >
        {chapters.map((chapter) => (
          <option key={chapter} value={chapter}>
            Chapter {chapter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChapterDropdown;
