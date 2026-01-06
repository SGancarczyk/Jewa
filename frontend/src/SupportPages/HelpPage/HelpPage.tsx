import React from 'react';
import './HelpPage.css';
import UpperBar from '../UpperBar/UpperBar';
import BottomBar from '../../support/BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';

function HelpPage() {
    return (
        <div className="page-wrapper">
            <UpperBar title="Pomoc"/>
            <ContentArea/>
            <BottomBar/>
        </div>
    );
}

export default HelpPage;