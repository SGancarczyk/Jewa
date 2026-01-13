import { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

export const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem("jwtToken");
        navigate("/");
     };

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
        if (userData) {
            return <>
                <button className="nav-button">
                    {userData}
                </button>
                <DropdownMenu onLogout={handleLogout} />
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
            <button
                className="logo-wrapper"
                onClick={() => navigate("/")}
            >
                <span className="logo-text">JEVA</span>
            </button>

            <div className="buttons-wrapper">
                {getButtons()}
            </div>
        </header>
    );
};

export default Header