import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="180206858986-37kab0rt1mplneee5bfusrrfudc89m3e.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
)

