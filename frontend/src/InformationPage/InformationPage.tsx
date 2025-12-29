import React from 'react';
import './InformationPage.css';
import UpperBar from './UpperBar/UpperBar';
import BottomBar from './BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';

function InformationPage() {
    return (
        <div className="page-wrapper">
            <UpperBar/>
            <ContentArea/>
            <BottomBar/>
        </div>
    );
}

export default InformationPage;