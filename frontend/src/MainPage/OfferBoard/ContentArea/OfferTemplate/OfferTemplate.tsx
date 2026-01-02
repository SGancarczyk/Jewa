import React from 'react';
import './OfferTemplate.css';
import { Icon } from '../../../../Icons/Icon';
import { useEffect, useState } from 'react';

interface OfferTemplateProps {
    id: number;
    title: string;
    price: string;
    images: any[];
}

function OfferTemplate({ id, title, price, images }: OfferTemplateProps) {
    const defaultImage = () => {
        return <div className="empty-image">
                <Icon name="carEmptyImage" width={70} height={70} color="#666666" />
                Brak Zdjęcia
            </div>
    }

    const importImage = (imagePath: any) => {
        return <img src={`http://localhost:8080/api/offers/images/${imagePath.fileName}`} alt={title} className="offer-image" />
    }

    return (
        <div className="offer-card">
            {images.length > 0 ? importImage(images[0]!) : defaultImage()}
            <div className="offer-info">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-price">{price}</p>
            </div>
        </div>
    );
}



export default OfferTemplate;