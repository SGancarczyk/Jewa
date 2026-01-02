import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";

function OfferCreatorPage() {
    const navigate = useNavigate();

    const uploadHardcodedImage = async (offerId: number, token: string) => {
        try {
            console.log(`Rozpoczynam upload zdjęcia dla oferty ID: ${offerId}...`);

            // 1. Pobieramy plik z folderu 'public' naszej aplikacji React
            // Zakładam, że wrzuciłeś plik 'test-car.jpg' do folderu public!
            const response = await fetch('/test-car.jpg');
            const blob = await response.blob(); // Zamieniamy go na Blob (plik w pamięci)

            // 2. Tworzymy obiekt File (udajemy, że użytkownik go wybrał)
            const file = new File([blob], "test-car.jpg", { type: "image/jpeg" });

            // 3. Pakujemy do FormData
            const formData = new FormData();
            formData.append("file", file);

            // 4. Wysyłamy na Twój endpoint
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
            title: "Testowa oferta BMW",
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
        <>
            <button onClick={() => navigate("/")}>
                Wróć do strony głównej
            </button>

            <button onClick={handleAddOffer}>
                Dodaj ofertę
            </button>
        </>
    );
}

export default OfferCreatorPage;