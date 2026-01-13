import { useEffect, useState } from "react";
import "./DateSelector.css";

type DateValue = {
  year: string;
  month: string;
  day: string;
};

type DateSelectProps = {
  label: string;
  onChange: (date: DateValue) => void;
};

function DateSelect({ label, onChange } : DateSelectProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (year && month && day) {
      onChange({
        year,
        month,
        day
      });
    }
  }, [year, month, day, onChange]);

  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="date-select">
      <span className="label">{label}</span>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Rok</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Miesiąc</option>
        {months.map((m, index) => (
          <option key={m} value={index + 1}>{m}</option>
        ))}
      </select>

      <select value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="">Dzień</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}

export default DateSelect;