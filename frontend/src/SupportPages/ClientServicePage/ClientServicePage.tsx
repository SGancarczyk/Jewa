import React from 'react';
import './ClientServicePage.css';
import UpperBar from '../UpperBar/UpperBar';
import BottomBar from '../BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';
function ClientServicePage() {
    return (
        <div className="page-wrapper">
            <UpperBar title="Osbługa Klienta"/>
            <ContentArea/>
            <BottomBar/>
        </div>
    );
}

export default ClientServicePage;