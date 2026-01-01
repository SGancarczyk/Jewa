import React, { useState } from 'react';
import './ContentArea.css';

function ContentArea() {

    const regulamin = "/documents/informacje/Regulamin.pdf"
    const polityka = "/documents/informacje/PolitykaPrywatnosci.pdf"
    const wymiana = "/documents/informacje/ZasadyWymiany.pdf"
    const spory = "/documents/informacje/PolitykaRozstrzyganiaSporow.pdf"
    const usugiElektroniczne = "/documents/informacje/WarunkiSwiadczeniaUslugElektronicznych.pdf"
    const daneFirmy = "/documents/informacje/DaneFirmy.pdf"

    return (
        <div className="content-area">
            <h2>Regulamin Korzystania</h2>
                <button className="standard-button" onClick={() => 
                    window.open(regulamin, "_blank", "noopener,noreferrer")
                }>
                    Otwórz Regulamin
                </button>
            <h2>Polityka Prywatności</h2>
                <button className="standard-button" onClick={() => 
                    window.open(polityka, "_blank", "noopener,noreferrer")
                }>
                    Otwórz Politykę Prywatności
                </button>
            <h2>Zasady wymiany</h2>
                <button className="standard-button" onClick={() => 
                    window.open(wymiana, "_blank", "noopener,noreferrer")
                }>
                    Otwórz Zasady wymiany
                </button>
            <h2>Polityka rostrzygania sporów</h2>
                <button className="standard-button" onClick={() => 
                    window.open(spory, "_blank", "noopener,noreferrer")
                }>
                    Otwórz Politykę rostrzygania sporów
                </button>
            <h2>Warunki świadczenia usług elektronicznych</h2>
                <button className="standard-button" onClick={() =>
                    window.open(usugiElektroniczne, "_blank", "noopener,noreferrer")
                }>
                    Otwórz warunki świadczenia usług elektronicznych
                </button>
            <h2>Dane firmy</h2>
                <button className="standard-button" onClick={() =>
                    window.open(daneFirmy, "_blank", "noopener,noreferrer")
                }>
                    Otwórz dane firmy
                </button>
        </div>

    );
}

export default ContentArea;
