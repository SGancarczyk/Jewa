import React from 'react';
import './OfferTemplate.css';

interface OfferTemplateProps {
    imageUrl: string;
    title: string;
    price: string;
}

function OfferTemplate({ imageUrl, title, price }: OfferTemplateProps) {
    return (
        <div className="offer-card">
            <img src={imageUrl} alt={title} className="offer-image" />
            <div className="offer-info">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-price">{price}</p>
            </div>
        </div>
    );
}



export default OfferTemplate;