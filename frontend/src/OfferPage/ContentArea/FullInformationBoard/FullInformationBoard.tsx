import "./FullInformationBoard.css";
import ImageRotor from './ImageRotor/ImageRotor';
import InformationField from './InformationField/InformationField';
import { Icon } from '../../../Icons/Icon';
interface OfferImage {
    id: number;
    fileName: string;
    contentType: string;
    main: boolean;
}

interface Offer {
    id: number;
    title: string;
    description: string;
    pricePerDay: number;
    createdAt: string;
    vehicleType: string;
    productionYear: number;
    bodyType: string;
    fuelType: string;
    city: string;
    address: string;
    images: OfferImage[];
    active: boolean;
    owner: {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
    };
    model: {
        id: number;
        name: string;
        make: {
            id: number;
            name: string;
        };
    };
}

function FullInformationBoard({ offer }: { offer: Offer }) {
    const hasImages = offer.images.length > 0;

    const images = offer.images.map(
        image => "http://localhost:8080/api/offers/images/" + image.fileName
    );

    return (
        <div className="FullInformationContainer">
            <div className="name-holder">
            <h1>{offer.title}</h1>
            </div>
            <div className="dual-holder-upper">
                {hasImages ? (
                    <ImageRotor images={images} />
                ) : (
                    <div className="border-wrapper">
                        <div className="image-placeholder">
                            <Icon
                                name="carEmptyImage"
                                width={500}
                                height={382.4}
                                color="#B0B0B0"
                            />
                        </div>
                    </div>
                )}

                <InformationField 
                    price={offer.pricePerDay} 
                    fuelType={offer.fuelType} 
                    make={offer.model.make.name} 
                    model={offer.model.name} 
                    productionYear={offer.productionYear} 
                    vehicleType={offer.vehicleType} 
                    bodyType={offer.bodyType} 
                    city={offer.city} 
                    address={offer.address} />
            </div>
            <div className="dual-holder-lower">
                <div className="desc-holder">
                    <h2>Opis:</h2>
                    <p>{offer.description}</p>
                </div>
                <button className="buy-button" onClick={() => {
                    alert('Congrats: YOU GOT SCAMMED!');
                }}>Kup Teraz</button>
            </div>

        </div>

    );
}

export default FullInformationBoard;