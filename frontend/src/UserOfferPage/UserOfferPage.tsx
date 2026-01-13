import React, { useState } from 'react';
import './UserOfferPage.css';
import { useParams } from 'react-router-dom';
import Header from '../support/Header/Header';
import TabSwitcher from './TabSwitcher/TabSwitcher';
import type { Tab } from "./TabSwitcher/TabSwitcher";
import ContentRequest from './ContentRequest/ContentRequest';
import ContentInfo from './ContentInfo/ContentInfo';
import BottomBar from '../support/BottomBar/BottomBar';


function UserOfferPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Oferty rezerwacji");
    const { id } = useParams();
    
    return (
        <div className="user-offerpage-container">
            <Header />
            <TabSwitcher activeTab={activeTab} onChange={setActiveTab}/>
            {activeTab === "Oferty rezerwacji" &&
                <ContentRequest offerId={Number(id)} />
            }
            {activeTab === "Informacje o ofercie" &&
                <ContentInfo id={Number(id)} />
            }

            <BottomBar />
        </div>
    );
}

export default UserOfferPage;