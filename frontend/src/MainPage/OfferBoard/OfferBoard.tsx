import React from 'react';
import UpperBar from './UpperBar/UpperBar';
import ContentArea from './ContentArea/ContentArea';
import './OfferBoard.css';

interface OfferBoardProps {
    offers: any[];
    searchLimit: number;
    onSearchLimit: (limit: number) => void;
}

function OfferBoard({ offers, searchLimit, onSearchLimit }: OfferBoardProps) {
    return (
        <div className='offer-board'>
            <UpperBar />
            <ContentArea offers={offers} searchLimit={searchLimit} onSearchLimit={onSearchLimit}/>
        </div>
    );
}

export default OfferBoard;
