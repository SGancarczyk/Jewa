import React from 'react';
import UpperBar from './UpperBar/UpperBar';
import ContentArea from './ContentArea/ContentArea';
import './OfferBoard.css';

interface OfferBoardProps {
    offers: any[];
    onSearchLimit: (limit: number) => void;
    searchLimit: number;
}

function OfferBoard({ offers, searchLimit }: OfferBoardProps) {
    return (
        <>
            <UpperBar />
            <ContentArea offers={offers} searchLimit={searchLimit}/>
        </>
    );
}

export default OfferBoard;
