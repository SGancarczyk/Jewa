import './Header.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header-container">
            <div className="logo-wrapper">
                <span className="logo-text">JEVA</span>
            </div>

            <div className="buttons-wrapper">
                <button className="nav-button" onClick={() => navigate("/login")}>
                    zaloguj się
                </button>

                <button className="nav-button" onClick={() => navigate("/register")}>
                    zarejestruj się
                </button>
            </div>
        </header>
    );
};

export default Header;