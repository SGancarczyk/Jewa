import React, { useState, useEffect } from 'react';
import './ContentInfo.css';
import ImageRotor from '../../support/ImageRotor/ImageRotor';
import InformationField from '../../support/InformationField/InformationField';
import { useNavigate } from 'react-router-dom';

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

function ContentInfo( { id }: { id: number } ) {
    const navigate = useNavigate();

    const [offer, setOffer] = useState<Offer | null>(null);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            fetch("http://localhost:8080/api/offers/get_offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
                .then(res => res.json())
                .then((data: Offer[]) => {
                    if (data[0]) {
                        setOffer(data[0]);
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }, [id]);
    
        if (loading) return <div>Ładowanie...</div>;
        if (!offer) return <div>Brak oferty</div>;

    return (
        <div className="four-pane-container">
        <div className="left-section">
            <div className="pane pane-1">{offer.title}</div>
            <div className="pane pane-2-3">
                <ImageRotor images={offer.images.map(image => "http://localhost:8080/api/offers/images/" + image.fileName)} />
                <InformationField
                    price={offer.pricePerDay}
                    fuelType={offer.fuelType}
                    make={offer.model.make.name}
                    model={offer.model.name}
                    productionYear={offer.productionYear}
                    vehicleType={offer.vehicleType}
                    bodyType={offer.bodyType}
                    city={offer.city}
                    address={offer.address}
                />
            </div>
        </div>

        <div className="right-section">
            <div className="pane pane-4">
                <button className="edit-offer-button" onClick={() => navigate(`/userOffer/edit/${id}`)}>
                    Edytuj ofertę
                </button>
            </div>
        </div>
        </div>
  );
}


export default ContentInfo;