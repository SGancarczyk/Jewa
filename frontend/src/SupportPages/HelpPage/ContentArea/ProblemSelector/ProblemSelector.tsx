import React, { useState } from "react";
import "./ProblemSelector.css";

interface Element {
  name: string;
  description: string;
  pdfUrl?: string;
}

interface PairedArray {
  items?: Element[];
}

const emptyElement: Element[] = [
  { name: "Wybierz opcję", description: "Brak dostępnych danych." }
];

const ProblemSelector: React.FC<PairedArray> = ({ items = emptyElement}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(Number(e.target.value));
  };

  return (
    <div className="dropdown-container">
      <select
        className="dropdown-select"
        value={selectedIndex}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="dropdown-description">
        {items[selectedIndex]?.description}
      </div>

      {items[selectedIndex]?.pdfUrl && (
        <div className="instruction-section">
          <p className="instruction-title">Szczegółowa instrukcja</p>
          <a
            className="instruction-link"
            href={items[selectedIndex]?.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pobierz PDF
          </a>
        </div>
      )}
    </div>

    
  );
};

export default ProblemSelector;