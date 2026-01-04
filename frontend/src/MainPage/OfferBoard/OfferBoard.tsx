import React from 'react';
import UpperBar from './UpperBar/UpperBar';
import ContentArea from './ContentArea/ContentArea';
import './OfferBoard.css';

interface OfferBoardProps {
    offers: any[];
    page: number;
    onPage: (limit: number) => void;
    endFlag: boolean;
}

function OfferBoard({ offers, page, onPage, endFlag }: OfferBoardProps) {
    return (
        <div className='offer-board'>
            <UpperBar />
            <ContentArea offers={offers} page={page} onPage={onPage} endFlag={endFlag}/>
        </div>
    );
}

export default OfferBoard;
