import React, { useState } from 'react';
import './ContentArea.css';
import EmailForm from './EmailForm/EmailForm';

function ContentArea() {

    return (
        <div className="content-area">
            <h2>Zgłoś swój problem wiadomością:</h2>
            <p><EmailForm
                titleSuggestions={[
                "Problem z logowaniem",
                "Zwroty i reklamacje",
                "Nie działa płatność",
                "Lorem Ipsum",
                "Ipsum Lorem",]}
            /></p>
            <h2>Lub przez telefon:</h2>
            <p>Telefon: 123-456-789</p>
            <h2>Infolinia otwarta w dniach:</h2>
            <p>Wtorek:   12:00 - 18:00</p>
            <p>Czwartek: 12:00 - 18:00</p>
            <p>Sobota:   10:00 - 16:00</p>
        </div>
    );
}

export default ContentArea;
