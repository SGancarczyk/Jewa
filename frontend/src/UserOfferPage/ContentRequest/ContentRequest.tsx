import "./ContentRequest.css";
import { useState, useEffect } from "react";
import type { PanelItem } from "./RequestComponent/RequestComponent";
import PanelRowComponent from "./RequestComponent/RequestComponent";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
}

interface Props {
  offerId: number;
}

function SplitManagementPanel({ offerId }: Props) {
    const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);
    const [acceptedReservations, setAcceptedReservations] = useState<Reservation[]>([]);
    const [isLoadingPending, setIsLoadingPending] = useState(false);
    const [isLoadingAccepted, setIsLoadingAccepted] = useState(false);

    const fetchReservations = async () => {
            const token = localStorage.getItem("jwtToken");
            setIsLoadingPending(true);
            console.log("Fetching pending reservations for offer:", offerId);
            try {
                const response = await fetch(
                `http://localhost:8080/api/reservation/get_pending/${offerId}`,
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

    const fetchAccepted = async () => {
        const token = localStorage.getItem("jwtToken");
        setIsLoadingAccepted(true);
        console.log("Fetching accepted reservations for offer:", offerId);
        try {
        const res = await fetch(
            `http://localhost:8080/api/reservation/get_reservations/${offerId}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            setAcceptedReservations(await res.json());
        }
        } catch (err) {
            console.error("Błąd get_reservations:", err);
        } finally {
            setIsLoadingAccepted(false);
        }
        };

    useEffect(() => {
        
        fetchReservations();
        fetchAccepted();
        
    }, [offerId]);

    const handleAccept = async (RequestId: number) => {
        console.log("Próba akceptacji:", RequestId)
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            console.error("Brak tokena JWT");
            return;
        }

        try {
            const response = await fetch(
            `http://localhost:8080/api/reservation/accept/${RequestId}`,
            {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.ok) {
            console.log("Reservation accepted:", RequestId);
            fetchReservations();
            fetchAccepted();
            } else {
            console.error("Błąd akceptacji:", response.status);
            }
        } catch (err) {
            console.error("Błąd fetch accept:", err);
        }
    };

    const handleReject = async (RequestId: number) => {
        console.log("Próba odrzucenia:", RequestId)
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            console.error("Brak tokena JWT");
            return;
        }

        try {
            const response = await fetch(
            `http://localhost:8080/api/reservation/decline/${RequestId}`,
            { method: "POST", headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.ok){
                console.log("Reservation declined:", RequestId);
                fetchReservations();
            } else {
                console.error("Błąd odrzucenia:", response.status);
            } 
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="split-panel">
        <div className="panel-side">
            <h2 className="panel-title">Oczekujące rezerwacje</h2>

            {isLoadingPending && <p>Ładowanie...</p>}

            {!isLoadingPending &&
            pendingReservations.map((reservation, index) => (
                <PanelRowComponent
                rowType="pending"
                key={`${reservation.startDate}-${reservation.endDate}`}
                item={{
                    RequestId: reservation.id,
                    idVisable: `${index + 1}.`,
                    dateBegin: `${reservation.startDate}`,
                    dateEnd: ` ${reservation.endDate}`,
                }}
                onAccept={() => handleAccept(reservation.id)}
                onReject={() => handleReject(reservation.id)}
                />
            ))}

            {!isLoadingPending && pendingReservations.length === 0 && (
            <p>Brak oczekujących rezerwacji</p>
            )}
        </div>

        <div className="panel-divider" />

        <div className="panel-side">
            <h2 className="panel-title">Zaakceptowane rezerwacje</h2>

            {isLoadingAccepted && <p>Ładowanie...</p>}

            {!isLoadingAccepted &&
                acceptedReservations.map((reservation, index) => (
                <PanelRowComponent
                    rowType="accepted"
                    key={`${reservation.startDate}-${reservation.endDate}`}
                    item={{
                    RequestId: reservation.id,
                    idVisable: `${index + 1}.`,
                    dateBegin: reservation.startDate,
                    dateEnd: reservation.endDate,
                    }}
                    onAccept={() => {}}
                    onReject={() => {}}
                />
                ))}

            {!isLoadingAccepted && acceptedReservations.length === 0 && (
                <p>Brak rezerwacji</p>
            )}
            </div>
        </div>
    );
}

export default SplitManagementPanel;