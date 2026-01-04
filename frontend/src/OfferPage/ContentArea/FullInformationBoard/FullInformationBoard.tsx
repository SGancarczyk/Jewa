import "./FullInformationBoard.css";
import ImageRotor from './ImageRotor/ImageRotor';
import InformationField from './InformationField/InformationField';
import test1 from '../../../assets/Opel-Insignia-2013 1-1.png';
import test2 from '../../../assets/Citroën_Grand_C4_Picasso_HDi_110_Tendance_(Facelift)_–_Frontansicht,_16._April_2011,_Düsseldorf 1-1.png';
import test3 from '../../../assets/image 1.png';

function FullInformationBoard() {
    const images = [
        test1,
        test2,
        test3
    ];


    return (
        <div className="FullInformationContainer">
            <div className="name-holder">
            <h1>Offer Name</h1>
            </div>
            <div className="dual-holder-upper">
                <ImageRotor images={images} />
                <InformationField />
            </div>
            <div className="dual-holder-lower">
                <div className="desc-holder">
                    <h2>Opis:</h2>
                    <p>Offer Desc</p>
                </div>
                <button className="buy-button" onClick={() => {
                    alert('Congrats: YOU GOT SCAMMED!');
                }}>Kup Teraz</button>
            </div>

        </div>

    );
}

export default FullInformationBoard;