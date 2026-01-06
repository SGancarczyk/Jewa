import React, { useEffect, useState } from 'react';
import './ContentArea.css';
import ImageSlider from './FullInformationBoard/ImageRotor/ImageRotor';
import InformationField from './FullInformationBoard/InformationField/InformationField';
import FullInformationBoard from './FullInformationBoard/FullInformationBoard';
import PersonalInfoBoard from './PersonalInfoBoard/PersonalInfoBoard';

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

function ContentArea({ id }: { id: number }) {
    
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
                    setOffer(data[0]); // bo backend zwraca tablicę
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Ładowanie...</div>;
    if (!offer) return <div>Brak oferty</div>;

    

    return (
        <div className="content-area-offer-page">
            <div className="offer-page-background-image" />
            <div className="full-information-wrapper">
                <FullInformationBoard offer={offer} />
            </div>
            <div className="personal-information-wrapper">
                <PersonalInfoBoard  
                    username={offer.owner.username}
                    firstName={offer.owner.firstName}
                    lastName={offer.owner.lastName}
                    email={offer.owner.email}
                    createdAt={offer.createdAt}
                />
            </div>
        </div>

    );
}

export default ContentArea;
