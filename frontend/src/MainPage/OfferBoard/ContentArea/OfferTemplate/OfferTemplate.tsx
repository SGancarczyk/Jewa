import React from 'react';
import './OfferTemplate.css';
import { Icon } from '../../../Selector/Icons/Icon';

interface OfferTemplateProps {
    title: string;
    price: string;
}

function OfferTemplate({ title, price }: OfferTemplateProps) {
    return (
        <div className="offer-card">
            <div className="empty-image">
                <Icon name="carEmptyImage" width={70} height={70} color="#666666" />
                Brak Zdjęcia
            </div>
            {/* <img src={imageUrl} alt={title} className="offer-image" /> */}
            <div className="offer-info">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-price">{price}</p>
            </div>
        </div>
    );
}



export default OfferTemplate;