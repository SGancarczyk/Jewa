import React from 'react';
import './ContactPage.css';
import UpperBar from '../UpperBar/UpperBar';
import BottomBar from '../../support/BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';

function ContactPage() {
    return (
        <div className="page-wrapper">
            <UpperBar title="Kontakt"/>
            <ContentArea/>
            <BottomBar/>
        </div>
    );
}

export default ContactPage;