import React from 'react';
import './UpperBar.css';
import { useNavigate } from 'react-router-dom';

function UpperBar() {
    const navigate = useNavigate();

    return (
        <div className="upper-bar">
            <h1 className="upper-title">Tablica Ogłoszeń</h1>
            <button
                className="add-offer-button"
                onClick={() => navigate("/offerCreator")}
            >
                Dodaj Ogłoszenie
            </button>
        </div>
    );
}

export default UpperBar;