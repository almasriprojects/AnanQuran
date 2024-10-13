// src/components/DropdownMenu/SectionDropdown.tsx
import React from "react";

interface SectionDropdownProps {
  selectedSection: number;
  setSelectedSection: (section: number) => void;
}

const SectionDropdown: React.FC<SectionDropdownProps> = ({ selectedSection, setSelectedSection }) => {
  const sections = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="mb-4">
      <label htmlFor="sectionDropdown" className="mr-2">Select Section:</label>
      <select
        id="sectionDropdown"
        value={selectedSection}
        onChange={(e) => setSelectedSection(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {sections.map((section) => (
          <option key={section} value={section}>
            Section {section}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectionDropdown;
