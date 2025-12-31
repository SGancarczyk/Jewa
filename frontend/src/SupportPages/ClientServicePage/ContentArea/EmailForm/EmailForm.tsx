import React, { useState } from "react";
import "./EmailForm.css";
import { href } from "react-router-dom";

interface EmailFormProps {
  titleSuggestions?: string[];
}

const EmailForm: React.FC<EmailFormProps> = ({titleSuggestions = [],}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const emailAddress = 'jewa.contact@gmail.com';

  const handleSendEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(description);
    window.location.href = (`mailto:${emailAddress}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="issue-form">
      <div className="form-field">
        <label className="form-label">Tytuł</label>
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {titleSuggestions.length > 0 && (
          <div className="title-suggestions">
            {titleSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-button"
                onClick={() => setTitle(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">Opis</label>
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="mail-button" onClick={handleSendEmail}>
        Wyślij wiadomość
      </button>
    </div>
  );
};

export default EmailForm;