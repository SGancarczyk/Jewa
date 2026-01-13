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
import ContentRequest from "./ContentRequest/ContentRequest"

type userDataType = {
    Userid : number,
    fullname : string,
}

function UserPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Ogłoszenia");
    const [offers, setOffers] = useState<any[]>([]);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [isOffersLoading, setIsOffersLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [endFlag, setEndFlag] = useState(false);
    const [userData, setUserData] = useState<userDataType>({ Userid: 0, fullname: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            setIsUserLoading(true);
            const token = localStorage.getItem("jwtToken");
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/api/user/get_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const fullName = `${data.firstName} ${data.lastName}`;
                    setUserData({ Userid: data.id, fullname: fullName });
                    console.log("Got user data for:", userData.Userid);
                } else {
                    console.error("Błąd pobierania danych użytkownika");
                }
            } catch (error) {
                console.error("Błąd pobierania danych użytkownika");
            } finally {
                setIsUserLoading(false);
            }
        };

        fetchUserData()
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contentAreaChange = (tab: Tab) => {
        setActiveTab(tab);
        setPage(0);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (userData.Userid === 0) return;
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
    }, [page, userData.Userid]);
    
    const getSearchResults = async () => {
        setIsOffersLoading(true);
        try {
            console.log("Getting all offers for user:", userData.Userid);
            const response = await fetch('http://localhost:8080/api/offers/get_offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ownerId: userData.Userid, page: page, limit: 10})
            });
    
            if (response.ok) {
                console.log(response);
                return await response.json();
            }
        } catch (error) {
            console.error("Błąd podczas pobierania ofert:", error);
        } finally {
            setIsOffersLoading(false);
        }
    };

    return (
        <div className="user-page">
            <Header />
            <ProfileComp image={notwigger} title={userData.fullname} localisation="Warszawa, Polska" logInfo="3" followersNumber='25' followingNumber='81' />
            <TabSwitcher activeTab={activeTab} onChange={contentAreaChange}/>
            
            {activeTab === "Ogłoszenia" && <ContentPageOffer offers={offers} page={page} onPage={setPage} endFlag={endFlag} />}
            {activeTab === "Opinie" && <ContentOpinions />}
            {activeTab === "Rezerwacje" && <ContentRequest />}

            <BottomBar />
        </div>
    );
}

export default UserPage;
