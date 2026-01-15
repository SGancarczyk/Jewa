import "./FullInformationBoard.css";
import ImageRotor from '../../../support/ImageRotor/ImageRotor';
import InformationField from '../../../support/InformationField/InformationField';
import DateSelect from './DateSelector/DateSelector';
import PaymentForm from "./PaymentComponent/PaymentForm";
import { Icon } from '../../../Icons/Icon';
import { useEffect, useState } from "react";
import { validateDateRange } from "./dateValidator";
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

type DateValue = {
  year: string;
  month: string;
  day: string;
};

function FullInformationBoard({ offer }: { offer: Offer }) {
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState<DateValue | null>(null);
    const [endDate, setEndDate] = useState<DateValue | null>(null);
    const [paymentInfo, setPaymentInfo] = useState({
    last4Digits: "",
    isComplete: false,
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/user/get_info', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setIsAuthenticated(response.ok);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);



    const error = validateDateRange(startDate, endDate, paymentInfo.isComplete);

    const hasImages = offer.images.length > 0;

    const images = offer.images.map(
        image => "http://localhost:8080/api/offers/images/" + image.fileName
    );

    const paymentAction = () => {
        if(!isAuthenticated) {
            alert("Musisz być zalogowany, aby dokonać rezerwacji.");
            return;
        }
        setShowModal(true);
    }

    const formatDateValue = (date: DateValue | null) => {
        if (!date) {
            return "2025-01-01";
        }
        const month = date.month.padStart(2, "0");
        const day = date.day.padStart(2, "0");
        return `${date.year}-${month}-${day}`;
    };


    const daysRent = (dateStartL: DateValue | null, endDateL: DateValue | null) => {
        if (!dateStartL || !endDateL) {
            return 0;
        }

        const d1 = new Date(Number(dateStartL.year), Number(dateStartL.month) - 1, Number(dateStartL.day)); // miesiące w JS zaczynają się od 0!
        const d2 = new Date(Number(endDateL.year), Number(endDateL.month) - 1, Number(endDateL.day));

        return 1 + Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    };



    const createReservation = async () => {
        const payload = {
            offerId: offer.id,
            startDate: formatDateValue(startDate),
            endDate: formatDateValue(endDate),
            cardToken: "tok_example",
            cardLast4Digits: paymentInfo.last4Digits,
        };

        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch("http://localhost:8080/api/reservation/request", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Reservation created:", data);
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    };

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
                <button className="buy-button" onClick={() => paymentAction()}>
                    Przejdź Dalej
                </button>
                {showModal && (
                    <div className="modal-overlay" onClick={() => {
                            setShowModal(false)
                            }}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                        {
                            offer.active ? (
                                <div>
                                    <h1>Potwierdzenie wyboru</h1>
                                    <h2><DateSelect
                                        label="Data początku"
                                        onChange={setStartDate} /></h2>
                                    <h2><DateSelect
                                        label="Data końca"
                                        onChange={setEndDate} /></h2>

                                    <PaymentForm onChange={setPaymentInfo} paymentValue={((daysRent(startDate, endDate) || 0) * offer.pricePerDay)} />
                                    <h1>Czy na pewno chcesz wybrać tę ofertę?</h1>
                                    <button
                                    className="accept-button"
                                    disabled={!!error}
                                    onClick={() => {
                                            createReservation();
                                            alert(`Wyłanono rezerwację na ${daysRent(startDate, endDate)} dni. \nŁączna kwota: ${daysRent(startDate, endDate) * offer.pricePerDay} PLN.`);
                                            setShowModal(false);
                                        }}
                                        > Tak </button>

                                    <button className="deny-button" onClick={() =>
                                        setShowModal(false)
                                    }>Nie</button>
                                    {error && <p className="error">{error}</p>}
                                </div>
                            ) : (
                                <div>
                                    <h2>Oferta niedostępna</h2>
                                    <p>Przepraszamy, ta oferta jest obecnie niedostępna.</p>
                                    <button onClick={() => setShowModal(false)}>Zamknij</button>
                                </div>
                            )
                        }
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}

export default FullInformationBoard;