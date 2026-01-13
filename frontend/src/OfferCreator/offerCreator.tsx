import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Header from "../support/Header/Header";
import BottomBar from "../support/BottomBar/BottomBar";
import './offerCreator.css';
import CustomTextField, { useTextField} from "../support/CustomTextField/TextField";
import SelectedImagesDisplay from "./SelectedImagesDisplay/SelectedImagesDisplay";
import { type ImageItem } from "./SelectedImagesDisplay/SelectedImagesDisplay";
import { AutoGuard } from "../support/AutoGuard/AutoGuard";
import DataSelsector from "./TechnicalDataSelector/TechnicalDataSelector";
import { type UploadCriteria } from "./TechnicalDataSelector/TechnicalDataSelector";


function OfferCreatorPage() {
    const [uploadData, setUploadData] = useState<UploadCriteria>({});
    const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);

    const titleFieldData = useTextField(
        "Tytuł ogłoszenia", "Tu podaj ogłoszenie...", 10, 40, ""
    )

    const descFieldData = useTextField(
        "Opis ogłoszenia", "Wpisz te informacje, które byłyby ważne dla ciebie, podczas przeglądania ogłoszenia", 40, 9000, ""
    )

    const priceFieldData = useTextField(
        "Cena za dzień", "Ile jest warty ten gruz?", 1, 5, "", "zł"
    )

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

        if (titleFieldData.value.length < titleFieldData.minLength || titleFieldData.value.length > titleFieldData.maxLength) {
            alert(`Tytuł oferty musi mieć od ${titleFieldData.minLength} do ${titleFieldData.maxLength} znaków.`);
            return;
        }

        if (descFieldData.value.length < descFieldData.minLength || descFieldData.value.length > descFieldData.maxLength) {
            alert(`Opis oferty musi mieć od ${descFieldData.minLength} do ${descFieldData.maxLength} znaków.`);
            return;
        }

        if (!uploadData.modelId) {
            alert("model pojazdu musi zostać wybrany!");
            return
        }

        if (!uploadData.vehicleType) {
            alert("Typ pojazdu musi zostać wybrany!")
        }

        const payload = {
            title: titleFieldData.value,
            description: descFieldData.value,
            pricePerDay: priceFieldData.value,
            vehicleType: uploadData.vehicleType,
            productionYear: 2022,
            bodyType: "SUV",
            fuelType: "DIESEL",
            model: { id: uploadData.modelId },
            images: [],
            city: "Warszawa",
            address: "ul. Marszałkowska 10",
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
                    style={{width: "70%"}}
                    fieldData={titleFieldData}
                />
            </div>

            <div className="creator-container">
                <h1 className="hero-title">Dodaj <strong>obrazy</strong></h1>
                <span>Pierwsze zdjęcie będzie zdjęciem głównym.</span>
                <SelectedImagesDisplay selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
            </div>

            <div className="creator-container">
                <h1 className="hero-title">Dodaj <strong>opis</strong></h1>
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

            <div className="creator-container">
                <h1 className='hero-title'>Podaj <strong>dane</strong> techniczne pojazdu</h1>
                <DataSelsector onUploadCriteria={setUploadData}/>
            </div>

            <AutoGuard>
                <button className="submit-offer-button" onClick={handleAddOffer}>
                    Dodaj ogłoszenie
                </button>
            </AutoGuard>

            <BottomBar />
        </div>
    );
}

export default OfferCreatorPage;
