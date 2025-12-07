import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icons/Icon';
import './AutocompleteSelect.css';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

export const AutocompleteSelect = ({ label, placeholder, value, options, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onSelect(option);
    setSearchTerm(option);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setIsOpen(true);
    if (val === '') {
        onSelect('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Opcjonalnie: Jeśli użytkownik wpisał "Aud" i kliknął poza,
        // przywracamy ostatnią poprawną wartość lub czyścimy.
        // Tutaj zostawiamy jak jest dla wygody.
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="selector-wrapper" ref={wrapperRef}>
      <label className="selector-label">{label}</label>

      <div className="input-container" onClick={() => setIsOpen(true)}>
        <input
          type="text"
          className="selector-input"
          placeholder={placeholder || "Wybierz..."}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />

        <div className={`arrow-icon ${isOpen ? 'open' : ''}`}>
           <Icon name="chevronDown" width={16} height={10} />
        </div>
      </div>

      {isOpen && (
        <ul className="options-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option}
                className="option-item"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="option-item no-results">Brak wyników</li>
          )}
        </ul>
      )}
    </div>
  );
};