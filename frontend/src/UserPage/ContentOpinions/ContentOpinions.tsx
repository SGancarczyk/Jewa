import React from 'react';
import { Link } from 'react-router-dom';
import './ContentOpinions.css';

const opinions = [
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
  { author: "Jan Kowalski", text: "To jest opinia użytkownika." },
];

function ContentOpinions() {
    return (
        <div className="opinions-wrapper">
            <div className="opinions-header">
                Opinie o użytkowniku:
            </div>
            {opinions.map((opinion, index) => (
                <div className="opinion-box" key={index}>
                <div className="opinion-author">{opinion.author}</div>
                <div className="opinion-text">{opinion.text}</div>
                </div>
            ))}
        </div>
    );
}

export default ContentOpinions;