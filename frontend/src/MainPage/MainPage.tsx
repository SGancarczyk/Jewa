import { useState } from "react";
import Header from "./Header/Header";
import Selsector from "./Selector/Selector";
import OfferBoard from "./OfferBoard/OfferBoard";
import BottomBar from "./BottomBar/BottomBar";
import Joiner from "./Joiner/Joiner";
import './MainPage.css'

function MainPage() {
    const [showBottomBar, setShowBottomBar] = useState(true); // stan kontrolujący BottomBar

    const handleOfferExpand = () => {
        console.log('Przycisk POKAŻ WIĘCEJ został kliknięty i dotarł do MainPage!');
        setShowBottomBar(false); // ukryj BottomBar po kliknięciu
    };

    return (
        <div className="desktop">
            <div className="background-image" />
            <Selsector />
            <Header />
            <Joiner />
            <OfferBoard onContentExpand={handleOfferExpand} />
            {showBottomBar && <BottomBar />}
        </div>
    );
}

export default MainPage;