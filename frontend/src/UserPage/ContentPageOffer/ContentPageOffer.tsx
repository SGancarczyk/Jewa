import React, { useState, useRef, useEffect } from 'react';
import './ContentPageOffer.css';
import OfferTemplate from '../../support/OfferTemplate/OfferTemplate';
import { Icon } from '../../Icons/Icon';
import { useNavigate } from 'react-router-dom';

interface ContentAreaProps {
    offers: any[];
    page: number;
    onPage: (limit: number) => void;
    endFlag: boolean;
}

function ContentAreaOffers({ offers, page, onPage, endFlag }: ContentAreaProps) {
    useEffect(() => {
        console.log(offers);
    }, [offers]);
    const navigate = useNavigate();

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
                        title={`${offer.model.make.name} ${offer.model.name}`}
                        price={offer.pricePerDay}
                        images={offer.images}
                        productionYear={offer.productionYear}
                        city={offer.city}
                        jumpLink="userOffer"
                    />
                ))}
                {endFlag && (
                    <div className="add-offer-card" onClick={() => {
                        navigate("/offerCreator")
                    }}>
                        <div className="add-offer-content">
                            <span className="add-offer-text">Dodaj ofertę</span>
                            <span className="add-offer-plus">+</span>
                        </div>
                    </div>
                )}
            </div>

            {!endFlag && showMoreOffers()}
        </div>
    );
}

export default ContentAreaOffers;
