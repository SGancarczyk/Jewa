import React from 'react';
import { Link } from 'react-router-dom';
import './BottomBar.css';

function BottomBar() {
    return (
        <div className="bottom-bar">
            <Link to="/" className="logo-link">JEVA</Link>

            <div className="links-container">
                <a className="footer-link" href="/help">Pomoc</a>
                <a className="footer-link" href="/contact">Kontakt</a>
                <a className="footer-link" href="/clientservice">Obsługa Klienta</a>
                <a className="footer-link" href="/information">Informacje</a>
            </div>
        </div>
    );
}

export default BottomBar;