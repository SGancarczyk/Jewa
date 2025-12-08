import { useEffect, useState } from 'react';
import './Selector.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons/Icon';
import TypeSelector from './TypeSelector/TypeSelector';
import { AutocompleteSelector } from './AutocompleteSelect/AutocompleteSelect';

const mockDatabase: Record<string, string[]> = {
    personal: ["Audi", "BMW", "Volkswagen", "Toyota", "Opel", "Polonez", "Citroen", "BYD", "Renault", "Nissan"],
    truck: ["Volvo", "Scania", "MAN", "DAF", "Mercedes-Benz Trucks"],
    construction: ["CAT", "JCB", "Komatsu", "Liebherr"]
};

export const Selsector = () => {
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrand] = useState<string | null>('');

    const currentBrandOptions = mockDatabase[vehicleType] || [];
    useEffect(() => {
        setBrand('');
    }, [vehicleType]);

    return <div className='container'>
        <h1 className='hero-title'>Znajdź idealne auto <strong>dla siebie</strong></h1>
        <div className='search-grid-container'>
            <TypeSelector selected={vehicleType} onSelect={setVehicleType} />
            <div className="brand-select-wrapper">
                <AutocompleteSelector
                    label="Marka pojazdu"
                    options={currentBrandOptions}
                    value={brand}
                    onChange={(newVal) => setBrand(newVal)}
                />
            </div>
            <div className="fuel-select-wrapper">
                <AutocompleteSelector
                    label="Model pojazdu"
                    options={currentBrandOptions}
                    value={brand}
                    onChange={(newVal) => setBrand(newVal)}
                />
            </div>
        </div>
    </div>
};

export default Selsector
