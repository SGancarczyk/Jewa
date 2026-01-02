import { use, useEffect, useState } from "react";
import Header from "../support/Header/Header";
import Selsector from "./Selector/Selector";
import OfferBoard from "./OfferBoard/OfferBoard";
import BottomBar from "../support/BottomBar/BottomBar";
import './MainPage.css'
import { type SearchCriteria } from "./Selector/Selector";

function MainPage() {
    const [offers, setOffers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});
    const [endFlag, setEndFlag] = useState(false);

    useEffect(() => {
        setPage(0);
    }, [searchCriteria]);

    useEffect(() => {
        console.log("Page changed:", page);
        getSearchResults(searchCriteria).then((data) => {
            if (data) {
                if (page === 0)
                    setOffers(data);
                else
                    setOffers(prev => [...prev, ...data]);
                setEndFlag(data.length === 0);
            }
        });
    }, [page, searchCriteria]);

    const getSearchResults = async (criteria: SearchCriteria) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/offers/get_offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  ...criteria, page: page, limit: 10 })
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
        <div className="desktop">
            <div className="background-image" />
            <Header />
            <Selsector onSearchCriteria={setSearchCriteria} />
            <OfferBoard offers={offers} page={page} onPage={setPage} endFlag={endFlag} />
            <BottomBar />
        </div>
    );
}

export default MainPage;