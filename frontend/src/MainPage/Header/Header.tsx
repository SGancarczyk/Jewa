import { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/api/user/get_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const fullName = `${data.firstName} ${data.lastName}`;
                    setUserData(fullName);
                } else {
                    console.error("Błąd pobierania danych użytkownika");
                }
            } catch (error) {
                console.error("Błąd pobierania danych użytkownika");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData()
    }, [])

    const getButtons = () => {
        if (isLoading) {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ClipLoader
                        loading={true}
                        color="#000000"
                        size={30}
                        speedMultiplier={1}
                    />
                </div>
        }
        if (userData) {
            return <>
                <button className="nav-button">
                    {userData}
                </button>

                <button className="nav-button" onClick={() => {
                    localStorage.removeItem("jwtToken");
                    setUserData(null);
                    navigate("/");
                }}>
                    Wyloguj
                </button>
            </>
        } else {
            return <>
                <button className="nav-button" onClick={() => navigate("/login")}>
                    zaloguj się
                </button>

                <button className="nav-button" onClick={() => navigate("/register")}>
                    zarejestruj się
                </button>
            </>
        }
    }

    return (
        <header className="header-container">
            <div className="logo-wrapper">
                <span className="logo-text">JEVA</span>
            </div>

            <div className="buttons-wrapper">
                {getButtons()}
            </div>
        </header>
    );
};

export default Header