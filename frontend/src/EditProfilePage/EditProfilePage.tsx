import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from "react"
import './EditProfilePage.css';
import Header from '../support/Header/Header';
import BottomBar from '../support/BottomBar/BottomBar';

type userDataType = {
    Userid : number,
    firstname : string,
    lastname : string,
    email: string,
    username: string
}

function EditProfilePage() {
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<userDataType>({ Userid: 0, username : "", firstname: "", lastname: "", email: ""});
    
    useEffect(() => {
        const fetchUserData = async () => {
            setIsUserLoading(true);
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
                    setUserData({ Userid: data.id, username: data.username, firstname: data.firstName,  lastname: data.lastName, email: data.email});
                    console.log("Got user data for:", userData.Userid);
                } else {
                    console.error("Błąd pobierania danych użytkownika");
                }
            } catch (error) {
                console.error("Błąd pobierania danych użytkownika");
            } finally {
                setIsUserLoading(false);
            }
        };
    
        fetchUserData()
    }, [])

    return (
        <div>
            <Header />

            <div className='EditProfilePageText-wrapper'>
            <h1>Imię:</h1>
            <h1>{userData.firstname}</h1>
            <h1>Nazwisko:</h1>
            <h1>{userData.lastname}</h1>
            <h1>Username:</h1>
            <h1>{userData.username}</h1>
            <h1>Email:</h1>
            <h1>{userData.email}</h1>
            </div>

            <BottomBar/>
        </div>

    );
}

export default EditProfilePage;