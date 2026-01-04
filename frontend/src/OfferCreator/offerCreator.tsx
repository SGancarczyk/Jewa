import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Header from "../support/Header/Header";
import BottomBar from "../support/BottomBar/BottomBar";
import './offerCreator.css';
import CustomTextField from "../support/CustomTextField/TextField";
import SelectedImagesDisplay from "./SelectedImagesDisplay/SelectedImagesDisplay";
import { type ImageItem } from "./SelectedImagesDisplay/SelectedImagesDisplay";

function OfferCreatorPage() {
    const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            selectedImages.forEach(image => URL.revokeObjectURL(image.previewUrl));
        };
    }, []);

    const uploadImage = async (offerId: number, token: string, file: File) => {
        try {
            console.log(`Rozpoczynam upload wybranego zdjęcia dla oferty ID: ${offerId}...`);

            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch(`http://localhost:8080/api/offers/${offerId}/images`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (uploadRes.ok) {
                console.log("SUKCES! Zdjęcie dodane.");
            } else {
                console.error("Błąd uploadu zdjęcia:", uploadRes.status);
            }

        } catch (error) {
            console.error("Błąd podczas wysyłania zdjęcia:", error);
        }
    };

    const handleAddOffer = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("Brak tokena! Zaloguj się najpierw.");
            return;
        }

        const payload = {
            title: { title },
            description: "To jest opis testowy ze sztywnych danych + wybrane zdjęcie.",
            pricePerDay: 150.00,
            vehicleType: "CARS",
            productionYear: 2022,
            bodyType: "SUV",
            fuelType: "DIESEL",
            model: { id: 1 },
            images: []
        };

        try {
            console.log("Tworzę ofertę...", payload);

            const response = await fetch('http://localhost:8080/api/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("SUKCES! Oferta utworzona. ID:", data.id);

                selectedImages.forEach(async (imageItem) => {
                    await uploadImage(data.id, token, imageItem.file);
                });

                alert("Udało się! Oferta i zdjęcie dodane.");
                setSelectedImages([]);
            } else {
                const errorText = await response.text();
                console.error("BŁĄD SERWERA:", response.status, errorText);
                alert(`Błąd: ${response.status}\n${errorText}`);
            }
        } catch (error) {
            console.error("Błąd sieci/połączenia:", error);
        }
    };

    return (
        <div className="offer-creator-page">
            <div className="creator-background-image" />
            <Header />

            <div className="creator-container">
                <h1 className="hero-title">Tworzenie nowej <strong>oferty</strong></h1>
                <CustomTextField
                    label="Tytuł ogłoszenia"
                    placeholder="Tu podaj tytuł..."
                    style={{width: "60%"}}
                    onChange={setTitle}
                    minLength={ 10 }
                />
            </div>

            <div className="creator-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h1 className="hero-title">Dodaj <strong>obrazy</strong></h1>
                <span>Pierwsze zdjęcie będzie zdjęciem głównym.</span>
                <SelectedImagesDisplay selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

            </div>
            <button className="submit-offer-button" onClick={handleAddOffer}>
                Dodaj ofertę
            </button>

            <BottomBar />
        </div>
    );
}

export default OfferCreatorPage;
