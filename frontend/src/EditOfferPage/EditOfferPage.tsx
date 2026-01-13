import { useNavigate, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Header from "../support/Header/Header";
import BottomBar from "../support/BottomBar/BottomBar";
import './EditOfferPage.css';
import CustomTextField, {useTextField} from "../support/CustomTextField/TextField";
import { AutoGuard } from "../support/AutoGuard/AutoGuard";


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

function EditOfferPage() {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { id } = useParams();
    
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
        


    const titleFieldData = useTextField(
        "Tytuł ogłoszenia", "Tu podaj ogłoszenie...", 10, 40, offer?.title || ""
    )

    const descFieldData = useTextField(
        "Opis ogłoszenia", "Wpisz te informacje, które byłyby ważne dla ciebie, podczas przeglądania ogłoszenia", 40, 9000, offer?.description || ""
    )

    const priceFieldData = useTextField(
        "Cena za dzień", "Ile jest warty ten gruz?", 1, 5, offer?.pricePerDay?.toString() || "", "zł"
    )

    useEffect(() => {
        if (offer) {
            titleFieldData.onChange(offer.title);
            descFieldData.onChange(offer.description);
            priceFieldData.onChange(offer.pricePerDay.toString());
        }
    }, [offer]);

    const handleAddOffer = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("Brak tokena! Zaloguj się najpierw.");
            return;
        }

        if (titleFieldData.value.length < titleFieldData.minLength || titleFieldData.value.length > titleFieldData.maxLength) {
            alert(`Tytuł oferty musi mieć od ${titleFieldData.minLength} do ${titleFieldData.maxLength} znaków.`);
            return;
        }

        if (descFieldData.value.length < descFieldData.minLength || descFieldData.value.length > descFieldData.maxLength) {
            alert(`Opis oferty musi mieć od ${descFieldData.minLength} do ${descFieldData.maxLength} znaków.`);
            return;
        }

        const payload = {
            "title": titleFieldData.value,
            "description": descFieldData.value,
            "pricePerDay": priceFieldData.value,
            "active": true,
            "city": "Warszawa",
            "address": "ul. Marszałkowska 10"
        }

        try {
            console.log("Edytuję ofertę", payload);

            const response = await fetch(`http://localhost:8080/api/offers/update/${id}` , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("SUKCES! Oferta zedytowana. ID:", data.id);
                
            } else {
                const errorText = await response.text();
                console.error("BŁĄD SERWERA:", response.status, errorText);
                alert(`Błąd: ${response.status}\n${errorText}`);
            }
        } catch (error) {
            console.error("Błąd sieci/połączenia:", error);
        }
        navigate(`/userOffer/${id}`)
    };

    return (
        <div className="offer-creator-page">
            <div className="creator-background-image" />
            <Header />

            <div className="creator-container">
                <h1 className="hero-title">Edytuj <strong>tytuł</strong></h1>
                <CustomTextField
                    style={{width: "70%"}}
                    fieldData={titleFieldData}
                />
            </div>

            <div className="creator-container">
                <h1 className="hero-title">Edytuj <strong>opis</strong></h1>
                <CustomTextField
                    style={{width: "70%"}}
                    fieldData={descFieldData}
                    multiline
                    rows={11}
                />

                <CustomTextField
                    style={{width: "30%"}}
                    fieldData={priceFieldData}
                />
            </div>

            <AutoGuard>
                <button className="submit-offer-button" onClick={handleAddOffer}>
                    Zatwierdź edycję
                </button>
            </AutoGuard>

            <BottomBar />
        </div>
    );
}

export default EditOfferPage;

