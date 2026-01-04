import React from 'react';
import './OfferTemplate.css';
import { Icon } from '../../Icons/Icon';
import { useEffect, useState } from 'react';
import { PlaceholderImage } from './PlaceholderImage';
import { useNavigate } from 'react-router-dom';

interface OfferTemplateProps {
    id: number;
    title: string;
    price: string;
    images: any[];
}

function OfferTemplate({ id, title, price, images }: OfferTemplateProps) {
    const importImage = (imagePath: any) => {
        return <img src={`http://localhost:8080/api/offers/images/${imagePath.fileName}`} alt={title} className="offer-image" />
    }
    const navigate = useNavigate();

    return (
        
        <div className="offer-card" onClick={
            () => navigate(`/offer/${id}`)
        }>
            {images.length > 0 ? importImage(images[0]!) : <PlaceholderImage />}
            <div className="offer-info">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-price">{price}</p>
            </div>
        </div>
    );
}



export default OfferTemplate;