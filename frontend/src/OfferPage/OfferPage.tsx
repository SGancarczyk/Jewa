import { useParams } from 'react-router-dom';
import "./OfferPage.css";
import BottomBar from '../support/BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';
import Header from "../support/Header/Header";

function OfferPage() {
    const { id } = useParams();

    return (
        <div className='offer-page'>
            <div className="offer-page-background-image" />
            <Header/>
            <ContentArea id={Number(id)} />
            <BottomBar />
        </div>
    );
}

export default OfferPage;