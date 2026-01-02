import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";

function OfferCreatorPage() {
    const navigate = useNavigate();

    const handleAddOffer = async () => {
        // 1. Sprawdź czy token istnieje, żeby nie wysyłać "Bearer null"
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            console.error("Brak tokena! Zaloguj się najpierw.");
            return;
        }

        const payload = {
            title: "Testowa oferta BMW",
            description: "To jest opis testowy ze sztywnych danych.",
            pricePerDay: 150.00,        // Nie musisz używać parseFloat, JS sam ogarnie liczbę
            vehicleType: "CARS",         // SPRAWDŹ w Java: czy masz CAR czy CARS?
            productionYear: 2022,       // Nie musisz używać parseInt
            bodyType: "SUV",            // SPRAWDŹ w Java
            fuelType: "DIESEL",         // POPRAWIONA LITERÓWKA (było fuleType)
            model: {
                id: 1                   // Upewnij się, że model o ID 1 istnieje w bazie!
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
                alert("Udało się! Sprawdź bazę danych.");
            } else {
                // To kluczowa zmiana - odczytaj błąd z backendu
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