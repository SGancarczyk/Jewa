import "./ContentRequest.css";
import { useState, useEffect } from "react";
import type { PanelItem } from "./RequestComponent/RequestComponent";
import PanelRowComponent from "./RequestComponent/RequestComponent";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  offer: {
    title: string;
  };
}


function SplitManagementPanel() {
    const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);
    const [acceptedReservations, setAcceptedReservations] = useState<Reservation[]>([]);
    const [isLoadingPending, setIsLoadingPending] = useState(false);
    const [isLoadingAccepted, setIsLoadingAccepted] = useState(false);

    const fetchReservations = async () => {
            const token = localStorage.getItem("jwtToken");
            setIsLoadingPending(true);
            console.log("Fetching pending reservations for User");
            try {
                const response = await fetch(
                `http://localhost:8080/api/reservation/get_requested`,
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
            console.log("Fetching accepted reservations for User");
            try {
                const response = await fetch(
                `http://localhost:8080/api/reservation/get_reservations`,
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
                setAcceptedReservations(data);
                }
            } catch (err) {
                console.error("Błąd pobierania zaakceptowanych rezerwacji:", err);
            } finally {
                setIsLoadingAccepted(false);
            }
        };



    useEffect(() => {
        fetchReservations();
        fetchAccepted();
    },[]);

    return (
        <div className="split-panel-white">
        <div className="panel-side-white">
            <h2 className="panel-title">Oczekujące rezerwacje</h2>

            {isLoadingPending && <p>Ładowanie...</p>}

            {!isLoadingPending &&
            pendingReservations.map((reservation, index) => (
                <PanelRowComponent
                rowType="pending"
                key={`${reservation.startDate}-${reservation.endDate}`}
                item={{
                    RequestId: reservation.id,
                    idVisable: `${index + 1}.  ${reservation.offer.title}`,
                    dateBegin: `${reservation.startDate}`,
                    dateEnd: ` ${reservation.endDate}`,
                }}
                />
            ))}

            {!isLoadingPending && pendingReservations.length === 0 && (
            <p>Brak oczekujących rezerwacji</p>
            )}
        </div>
        <div className="panel-divider" />
        <div className="panel-side-white">
            <h2 className="panel-title">Zaakceptowane rezerwacje</h2>

            {isLoadingAccepted && <p>Ładowanie...</p>}

            {!isLoadingAccepted &&
                acceptedReservations.map((reservation, index) => (
                <PanelRowComponent
                    rowType="accepted"
                    key={`${reservation.startDate}-${reservation.endDate}`}
                    item={{
                    RequestId: reservation.id,
                    idVisable: `${index + 1}.  ${reservation.offer.title}`,
                    dateBegin: reservation.startDate,
                    dateEnd: reservation.endDate,
                    }}
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