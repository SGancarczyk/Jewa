import React from 'react';
import UpperBar from './UpperBar/UpperBar';
import ContentArea from './ContentArea/ContentArea';
import './OfferBoard.css';

interface OfferBoardProps {
    onContentExpand?: () => void;
}

function OfferBoard({ onContentExpand }: OfferBoardProps) {
    const handleContentExpand = () => {
        console.log('Przycisk POKAŻ WIĘCEJ został kliknięty w OfferBoard!');
        // wywołujemy callback z MainPage
        if (onContentExpand) onContentExpand();
    };

    return (
        <div className="page-wrapper">
            <UpperBar />
            <ContentArea onExpand={handleContentExpand} />
        </div>
    );
}

export default OfferBoard;
