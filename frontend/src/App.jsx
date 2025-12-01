import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("jwtToken", result.token);
                navigate("/dashboard");
            } else {
                alert("Błąd logowania! Sprawdź login i hasło.");
            }
        } catch (err) {
            console.error(err);
            alert("Błąd połączenia z serwerem");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none' }}>
                    Zaloguj się
                </button>
            </form>

            <hr />

            <p>Nie masz konta?</p>
            <button
                onClick={() => navigate('/register')}
                style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
                Załóż konto
            </button>
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
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
                <input name="firstname" placeholder="Imię" onChange={handleChange} required style={{ padding: '8px' }} />
                <input name="lastname" placeholder="Nazwisko" onChange={handleChange} required style={{ padding: '8px' }} />
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;