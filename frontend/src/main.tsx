import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="180206858986-37kab0rt1mplneee5bfusrrfudc89m3e.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
)

