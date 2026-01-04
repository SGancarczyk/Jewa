import React, { useState } from "react";
import "./CopyText.css";

interface CopyTextProps {
  text: string;
  copyText: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text, copyText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Błąd przy kopiowaniu: ", err));
  };

  return (
    <div className="copy-container">
      <p className="copy-text">{text}</p>
      <button className="copy-button" onClick={handleCopy}>
        {copied ? "Skopiowano!" : "Kopiuj"}
      </button>
    </div>
  );
};

export default CopyText;