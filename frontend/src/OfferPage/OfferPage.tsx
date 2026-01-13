import { useParams } from 'react-router-dom';
import "./OfferPage.css";
import BottomBar from '../support/BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';
import UpperBar from './UpperBar/UpperBar';

function OfferPage() {
    const { id } = useParams();

    return (
        <div>
            <UpperBar title={`POŻYCZ SAMOCHÓD TERAZ!`}/>
            <ContentArea id={Number(id)} />
            <BottomBar />
        </div>
    );
}

export default OfferPage;