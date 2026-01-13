import React, { useState } from 'react';
import './ContentArea.css';
import CopyText from  "./CopyText/CopyText";

function ContentArea() {
    const phoneNumber = '+48 123 456 789';
    const emailAddress = 'jewa.contact@gmail.com';
    const name = 'Jewa Corporation';
    const street = 'ul. Jewy Jawawskiego 20a';
    const city = '21-123 Warszawa';
    const country = 'Polska';
    const fullAdress = 'Jewa Corporation ul. Jewy Jawawskiego 20a 21-123 Warszawa Polska';

    const handleMail = () => {
        window.location.href = "mailto:" + emailAddress;
    };


    return (
        <div className="content-area">
            <h1>Dane Kontaktowe:</h1>
            <h2>Telefon:</h2>
            <CopyText text={phoneNumber} copyText={phoneNumber} />
            <h2>Email:</h2>
            <CopyText text={emailAddress} copyText={emailAddress} />
            <button className="mail-button" onClick={handleMail}>
                Napisz teraz!
            </button>
            <h2>Adres:</h2>
            <CopyText text={name} copyText={fullAdress} />
            <p>{street}</p>
            <p>{city}</p>
            <p>{country}</p>
        </div>
    );
}


export default ContentArea;
