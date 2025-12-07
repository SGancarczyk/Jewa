import Header from "./Header/Header";
import Selsector from "./Selector/Selector";
import './MainPage.css'

function MainPage() {
    return <div className="desktop">
        <div className="background-image" />
        <Selsector />
        <Header />
    </div>
}

export default MainPage;