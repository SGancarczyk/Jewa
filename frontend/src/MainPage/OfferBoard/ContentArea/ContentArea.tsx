import React, { useState, useRef, useEffect } from 'react';
import './ContentArea.css';
import OfferTemplate from './OfferTemplate/OfferTemplate';
import { Icon } from '../../../Icons/Icon';

// const mockDatabase = [
//   { imageUrl: test3, title: "Audi A6", price: "54 900 zł" },
// ];

interface ContentAreaProps {
    offers: any[];
    page: number;
    onPage: (limit: number) => void;
    endFlag: boolean;
}

function ContentArea({ offers, page, onPage, endFlag }: ContentAreaProps) {
    useEffect(() => {
        console.log(offers);
    }, [offers]);

    const showMoreOffers = () => {
        return <button
            className="scroll-toggle-button"
            onClick={() => onPage(page + 1)}
        >
            <span className="button-text">POKAŻ WIĘCEJ</span>
            <div className="button-icon" style={{ marginTop: '0.5rem', marginLeft: '3.5rem' }}>
                <Icon name="chevronDown" width={120} height={120} color="#000000ff" />
            </div>
        </button>
    }

    const emptyOfferBoard = () => {
        return <div className="brak-ofert-message">
            Brak Ofert
            <Icon name="emptyList" width={100} height={100} color="#000000ff" />
        </div>
    }

    return (
        <div className="aaacontent-area">
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'

            }}>
                {offers.map((offer, index) => (
                    <OfferTemplate
                        key={index}
                        id={offer.id}
                        title={offer.title}
                        price={offer.price}
                        images={offer.images}
                    />
                ))}
            </div>

            {offers.length === 0 && emptyOfferBoard()}
            {!endFlag && showMoreOffers()}
        </div>
    );
}


export default ContentArea;
