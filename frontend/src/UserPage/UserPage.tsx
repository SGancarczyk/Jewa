import { use, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './UserPage.css';
import Header from '../support/Header/Header';
import ProfileComp from './ProfileComp/ProfileComp';
import TabSwitcher from "./TabSwitcher/TabSwitcher";
import type { Tab } from "./TabSwitcher/TabSwitcher";
import notwigger from "../assets/niggs.png";
import ContentPageOffer from "./ContentPageOffer/ContentPageOffer"
import ContentOpinions from "./ContentOpinions/ContentOpinions";
import BottomBar from "../support/BottomBar/BottomBar";

function UserPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Ogłoszenia");
    const [offers, setOffers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [endFlag, setEndFlag] = useState(false);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contentAreaChange = (tab: Tab) => {
        setActiveTab(tab);
        setPage(0);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        console.log("Page changed:", page);
        getSearchResults().then((data) => {
            if (data) {
                if (page === 0)
                    setOffers(data);
                else
                    setOffers(prev => [...prev, ...data]);
                setEndFlag(data.length < 10);
            }
        });
    }, [page]);
    
    const getSearchResults = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/offers/get_offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({page: page, limit: 10 })
            });
    
            if (response.ok) {
                console.log(response);
                return await response.json();
            }
        } catch (error) {
            console.error("Błąd podczas pobierania ofert:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-page">
            <Header />
            <ProfileComp image={notwigger} title="Jan Kowalski" localisation="Warszawa, Polska" logInfo="3" followersNumber='25' followingNumber='81' />
            <TabSwitcher activeTab={activeTab} onChange={contentAreaChange}/>
            
            {activeTab === "Ogłoszenia" && <ContentPageOffer offers={offers} page={page} onPage={setPage} endFlag={endFlag} />}
            {activeTab === "Opinie" && <ContentOpinions />}
            <BottomBar />
        </div>
    );
}

export default UserPage;
