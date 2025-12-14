import { useState } from "react";
import Header from "./Header/Header";
import Selsector from "./Selector/Selector";
import OfferBoard from "./OfferBoard/OfferBoard";
import BottomBar from "./BottomBar/BottomBar";
import Joiner from "./Joiner/Joiner";
import './MainPage.css'
import ContentArea from "./OfferBoard/ContentArea/ContentArea";

function MainPage() {
    return (
        <div className="desktop">
            <div className="background-image" />
            <Selsector />
            <Header />
            <Joiner />
            <OfferBoard />
            <BottomBar />
        </div>
    );
}

export default MainPage;