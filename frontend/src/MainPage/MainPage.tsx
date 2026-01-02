import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Selsector from "./Selector/Selector";
import OfferBoard from "./OfferBoard/OfferBoard";
import BottomBar from "./BottomBar/BottomBar";
import './MainPage.css'


interface SearchCriteria {
    page: number;
    limit: number;
    make?: string;
    model?: string;
    year?: string;
    vehicleType?: string;
}

function MainPage() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchLimit, setSearchLimit] = useState(10);

    const handleSearch = async (criteria: SearchCriteria) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/offers/get_offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(criteria)
            });

            if (response.ok) {
                console.log(response);
                const data = await response.json();
                setOffers(data);
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
            <Selsector onSearch={handleSearch} searchLimit={searchLimit}/>
            <OfferBoard offers={offers} searchLimit={searchLimit} onSearchLimit={setSearchLimit}/>
            <BottomBar />
        </div>
    );
}

export default MainPage;