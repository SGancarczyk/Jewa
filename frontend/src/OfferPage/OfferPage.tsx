import { useParams } from 'react-router-dom';
import "./OfferPage.css";
import BottomBar from './BottomBar/BottomBar';
import ContentArea from './ContentArea/ContentArea';
import UpperBar from './UpperBar/UpperBar';

function OfferPage() {
    const { id } = useParams();

    return (
        <div>
            <UpperBar title={`Oferta numer  ${id}`}/>
            <ContentArea />
            <BottomBar />
        </div>
    );
}

export default OfferPage;