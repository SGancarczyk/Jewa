import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DropdownMenu.css";
import notwigger from "../../assets/niggs.png";

type DropdownMenuProps = {
    onLogout: () => void;
};

function DropdownMenu({ onLogout }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="menu-container">
            <button
                className={`circle-button ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <img src={notwigger} alt="menu" />
            </button>

            {open && (
                <div className="options">
                <button onClick={() => 
                    navigate("/user")
                }>Moje Konto</button>
                <button onClick={() => 
                    navigate("/user/edit")
                }>Edytuj Konto</button>
                <button onClick={() => {
                    onLogout();
                }}>Wyloguj</button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;