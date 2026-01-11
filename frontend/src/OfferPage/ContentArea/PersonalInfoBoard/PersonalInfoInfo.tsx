import "./PersonalInfoBoard.css";

interface PersonalFieldProps {
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    createdAt : string;
}

function PersonalInfoBoard(prop: PersonalFieldProps) {
    return (
        <div className="Personal-info-board">
            <div className="PersonalInfoContainer">
                <div className="title-personal-info">
                    <h2>Informacje właściciela:</h2>
                </div>
                <div className = "main-personal-info">
                    <div className="personal-cell-name">Użytkownik:</div>
                    <div className="personal-cell-info">{prop.username}</div>
                    <div className="personal-cell-name">Imie:</div>
                    <div className="personal-cell-info">{prop.firstName}</div>
                    <div className="personal-cell-name">Nazwisko:</div>
                    <div className="personal-cell-info">{prop.lastName}</div>
                    <div className="personal-cell-name">Email:</div>
                    <div className="personal-cell-info">{prop.email}</div>
                    <div className="personal-cell-name">Data wrzucenia oferty:</div>
                    <div className="personal-cell-info">{new Date(prop.createdAt).toLocaleDateString("pl-PL")}</div>
                </div>
            </div>
        </div>
    );
}
export default PersonalInfoBoard;