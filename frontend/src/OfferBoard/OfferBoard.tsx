import React from 'react';
import UpperBar from './UpperBar/UpperBar';
import ContentArea from './ContentArea/ContentArea';
import BottomBar from './BottomBar/BottomBar';
import './OfferBoard.css';

function OfferBoard() {
    return (
        <div className="page-wrapper">
            <UpperBar />
            <ContentArea />
            <BottomBar />
        </div>
    );
}

export default OfferBoard;