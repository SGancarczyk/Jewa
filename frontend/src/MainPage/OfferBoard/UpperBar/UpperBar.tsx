import React from 'react';
import './UpperBar.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../Icons/Icon';

function UpperBar() {
    const navigate = useNavigate();

    return (
        <div className="upper-bar">
            <h1 className="upper-title">Tablica Ogłoszeń</h1>
            <button
                className="add-offer-button"
                onClick={() => navigate("/offerCreator")}
            >
                <Icon name="addCircle" width={24} height={24} color="#ffffff"/>
                Dodaj Ogłoszenie
            </button>
        </div>
    );
}

export default UpperBar;