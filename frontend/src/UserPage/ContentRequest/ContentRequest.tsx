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
    const [isLoadingPending, setIsLoadingPending] = useState(false);

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

    useEffect(() => {
        fetchReservations();
        
    },[]);

    return (
        <div className="split-panel-white">
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
                    idVisable: `${index + 1}. ${reservation.offer.title}`,
                    dateBegin: `${reservation.startDate}`,
                    dateEnd: ` ${reservation.endDate}`,
                }}
                />
            ))}

            {!isLoadingPending && pendingReservations.length === 0 && (
            <p>Brak oczekujących rezerwacji</p>
            )}
        </div>
        </div>
    );
}

export default SplitManagementPanel;