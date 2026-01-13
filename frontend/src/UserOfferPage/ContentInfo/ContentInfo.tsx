import React, { useState, useEffect } from 'react';
import './ContentInfo.css';
import ImageRotor from '../../support/ImageRotor/ImageRotor';
import InformationField from '../../support/InformationField/InformationField';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../Icons/Icon';

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
}

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
    const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);
    const [isLoadingPending, setIsLoadingPending] = useState(false);
    
    const fetchReservations = async () => {
        const token = localStorage.getItem("jwtToken");
        setIsLoadingPending(true);
        console.log("Fetching pending reservations for offer:", id);
        try {
            const response = await fetch(
            `http://localhost:8080/api/reservation/get_pending/${id}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            );
    
            if (response.ok) {
                const data = await response.json();
                setPendingReservations(data);
            }
        } catch (err) {
            console.error("Błąd pobierania rezerwacji:", err);
        } finally {
            setIsLoadingPending(false);
        }
    };
        
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
        fetchReservations()
        }, [id]);
    
        if (loading) return <div>Ładowanie...</div>;
        if (!offer) return <div>Brak oferty</div>;

    

    return (
        <div className="four-pane-container">
        <div className="left-section">
            <div className="pane pane-1">{offer.title}</div>
            <div className="pane pane-2-3">
                {offer.images.length > 0 ? (
                    <ImageRotor images={offer.images.map(image => "http://localhost:8080/api/offers/images/" + image.fileName)} />
                ) : (
                    <div className="border-wrapper">
                        <div className="image-placeholder">
                            <Icon
                                name="carEmptyImage"
                                width={720}
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
                    address={offer.address}
                />
            </div>
        </div>

        <div className="right-section">
            <div className="pane pane-4">
                <button className="edit-offer-button" onClick={() => {
                    if(pendingReservations.length > 0){
                        alert("Nie możesz edytować oferty jeśli są złożone do niej jeszcze rozpatrzone rezerwacje")
                    }
                    else{
                        navigate(`/userOffer/edit/${id}`)
                    }

                }}>
                    Edytuj ofertę
                </button>
            </div>
        </div>
        </div>
  );
}


export default ContentInfo;