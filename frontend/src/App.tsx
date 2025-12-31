import { BrowserRouter, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import MainPage from './MainPage/MainPage';
import InformationPage from './SupportPages/InformationPage/InformationPage';
import HelpPage from './SupportPages/HelpPage/HelpPage';
import ContactPage from './SupportPages/ContactPage/ContactPage';
import ClientServicePage from './SupportPages/ClientServicePage/ClientServicePage';
import OfferPage from './OfferPage/OfferPage';
import OfferCreatorPage from './OfferCreator/offerCreator';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const Loginresponse = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (Loginresponse.ok) {
                const result = await Loginresponse.json();
                const token = result.token;
                localStorage.setItem("jwtToken", token);

                const userResponse = await fetch('http://localhost:8080/api/user/get_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    console.log("Dane zalogowanego użytkownika:", userData);
                    navigate("/");
                } else {
                    alert("Błąd przy pobraniu użytkownika");
                }
            } else {
                alert("Błąd logowania! Sprawdź login i hasło.");
            }
        } catch (err) {
            console.error(err);
            alert("Błąd połączenia z serwerem");
        }
    };

    const handleGoogleTest = async (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential;
        console.log("Token Google:", token);

        try {
            const response = await fetch('http://localhost:8080/api/auth/google_auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain' // Ważne: wysyłamy jako tekst, nie JSON
                },
                body: token ?? null
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.token;
                localStorage.setItem("jwtToken", token);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            alert("Nie udało się połączyć z backendem.");
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            maxWidth: "400px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px"
        }}>
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <input
                    type="text" placeholder="Username" required
                    value={username} onChange={e => setUsername(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <input
                    type="password" placeholder="Hasło" required
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Zaloguj się
                </button>
            </form>

            <hr style={{ width: '100%', margin: '10px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p style={{ margin: 0 }}>Nie masz konta?</p>
                <button
                    onClick={() => navigate('/register')}
                    style={{ padding: '5px 10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                >
                    Załóż konto
                </button>
            </div>

            {/* Podpięcie funkcji handleGoogleTest */}
            <GoogleLogin
                onSuccess={handleGoogleTest}
                onError={() => {
                    console.log('Logowanie Google nieudane');
                }}
            />
        </div>
    );
}

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Konto utworzone! Możesz się zalogować.");
                navigate("/"); // Powrót do logowania
            } else {
                const errorText = await response.text();
                alert("Błąd rejestracji: " + errorText);
            }
        } catch (err) {
            console.error(err);
            alert("Błąd połączenia");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="firstName" placeholder="Imię" onChange={handleChange} required style={{ padding: '8px' }} />
                <input name="lastName" placeholder="Nazwisko" onChange={handleChange} required style={{ padding: '8px' }} />
                <input name="username" placeholder="Username (login)" onChange={handleChange} required style={{ padding: '8px' }} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ padding: '8px' }} />
                <input name="password" type="password" placeholder="Hasło" onChange={handleChange} required style={{ padding: '8px' }} />

                <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none' }}>
                    Zarejestruj się
                </button>
            </form>

            <button
                onClick={() => navigate('/')}
                style={{ marginTop: '10px', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
            >
                Wróć do logowania
            </button>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Witaj w Panelu!</h1>
            <p>Jesteś zalogowany.</p>
            <div style={{ wordBreak: 'break-all', padding: '20px', background: '#f0f0f0' }}>
                Twój token: <br/> {token}
            </div>
            <br />
            <button onClick={() => {
                localStorage.removeItem("jwtToken");
                navigate("/");
            }}>Wyloguj</button>
        </div>
    );
}

const ProtectedRoute = () => {
    const token = localStorage.getItem("jwtToken");
    return token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/information" element={<InformationPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/clientservice" element={<ClientServicePage />} />
                <Route path="/offer/:id" element={<OfferPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/offerCreator" element={<OfferCreatorPage />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
