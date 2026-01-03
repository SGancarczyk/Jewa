import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Header from "../support/Header/Header";
import BottomBar from "../support/BottomBar/BottomBar";
import './offerCreator.css';
import CustomTextField from "../support/CustomTextField/TextField";


function OfferCreatorPage() {
    const uploadHardcodedImage = async (offerId: number, token: string) => {
        try {
            console.log(`Rozpoczynam upload zdjęcia dla oferty ID: ${offerId}...`);
            const response = await fetch('/test-car.jpg');
            const blob = await response.blob();
            const file = new File([blob], "test-car.jpg", { type: "image/jpeg" });
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
            console.error("Brak tokena! Zaloguj się najpierw.");
            return;
        }

        const payload = {
            title: "Testowa oferta",
            description: "To jest opis testowy ze sztywnych danych.",
            pricePerDay: 150.00,
            vehicleType: "CARS",
            productionYear: 2022,
            bodyType: "SUV",
            fuelType: "DIESEL",
            model: {
                id: 1
            },
            images: []
        };

        try {
            console.log("Wysyłam payload:", payload); // Podgląd co leci

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
                await uploadHardcodedImage(data.id, token);
                alert("Udało się! Sprawdź bazę danych.");
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
                <CustomTextField label="Tytuł ogłoszenia" placeholder="Tu podaj tytuł..." style={{width: "60%"}} />
            </div>

            <div className="creator-container">
                <h1 className="hero-title">Dodaj <strong>obrazy</strong></h1>
            </div>
            <BottomBar />
        </div>
    );
}

export default OfferCreatorPage;