import { useState } from "react";
import Header from "./Header/Header";
import Selsector from "./Selector/Selector";
import OfferBoard from "./OfferBoard/OfferBoard";
import BottomBar from "./BottomBar/BottomBar";
import './MainPage.css'

function MainPage() {
    return (
        <div className="desktop">
            <div className="background-image" />
            <Selsector />
            <Header />
            <OfferBoard />
            <BottomBar />
        </div>
    );
}

export default MainPage;