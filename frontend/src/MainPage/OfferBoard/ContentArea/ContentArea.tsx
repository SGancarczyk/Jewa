import React, { useState, useRef, useEffect } from 'react';
import './ContentArea.css';
import OfferTemplate from './OfferTemplate/OfferTemplate';
import { Icon } from '../../Selector/Icons/Icon';

// const mockDatabase = [
//   { imageUrl: test3, title: "Audi A6", price: "54 900 zł" },
// ];

interface ContentAreaProps {
    offers: any[];
    searchLimit: number
}

function ContentArea({ offers, searchLimit }: ContentAreaProps) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        console.log(offers);
    }, [offers]);

    const showMoreOffers = () => {
        return <button
            className="scroll-toggle-button"
            onClick={() => setExpanded(true)}
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
                        title={offer.title}
                        price={offer.price}
                    />
                ))}
            </div>

            {offers.length === 0 && emptyOfferBoard()}
            {offers.length >= searchLimit && showMoreOffers()}
        </div>
    );
}


export default ContentArea;
