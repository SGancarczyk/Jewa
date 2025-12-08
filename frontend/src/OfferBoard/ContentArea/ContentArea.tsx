import React, { useState } from 'react';
import './ContentArea.css';
import test1 from '../../assets/Opel-Insignia-2013 1-1.png';

import OfferTemplate from './OfferTemplate/OfferTemplate';

function ContentArea() {
    const [blocked, setBlocked] = useState(true);
    const [buttonVisible, setButtonVisible] = useState(true); // kontrola widoczności przycisku

  const handleClick = () => {
    setBlocked(false);   // odblokowujemy scroll
    setButtonVisible(false);  // ukrywamy przycisk
  };
    const offers = [
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
        { imageUrl: test1, title: 'Produkt 1', price: '99 zł' },
    ];

    return (
        <div className="content-area">

            <div className="offers-grid"
                style={{
                    overflowY: blocked ? "hidden" : "auto",
                }}>
                {offers.map((offer, index) => (
                    <OfferTemplate
                        key={index}
                        imageUrl={offer.imageUrl}
                        title={offer.title}
                        price={offer.price}
                    />
                ))}
                
            </div>
            
            {buttonVisible && (
            <button className="scroll-toggle-button"
                onClick={() => handleClick()}
                style={{
                position: "absolute",
                bottom: "15vh",
                left: "0vw",
                zIndex: 10,
                }}
                >
            {blocked ? "POKAŻ WIĘCEJ" : "Debug_ScrollOpen"}
            </button>)}
        </div>
    );
}

export default ContentArea;
