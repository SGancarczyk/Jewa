import { useEffect, useState } from 'react';
import './Selector.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons/Icon';
import TypeSelector from './TypeSelector/TypeSelector';
import { AutocompleteSelect } from './AutocompleteSelect/AutocompleteSelect';

const mockDatabase: Record<string, string[]> = {
  personal: ["Audi", "BMW", "Volkswagen", "Toyota", "Opel"],
  truck: ["Volvo", "Scania", "MAN", "DAF", "Mercedes-Benz Trucks"],
  construction: ["CAT", "JCB", "Komatsu", "Liebherr"]
};

export const Selsector = () => {
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrand] = useState('');

    const currentBrandOptions = mockDatabase[vehicleType] || [];
    useEffect(() => {
        setBrand('');
    }, [vehicleType]);

    return <div className='container'>
        <h1 className='hero-title'>Znajdź idealne auto <strong>dla siebie</strong></h1>
        <TypeSelector selected={vehicleType} onSelect={setVehicleType}/>

        <AutocompleteSelect
            label="Marka pojazdu"
            placeholder="Wpisz markę..."
            value={brand}
            onSelect={(val) => setBrand(val)}
            options={currentBrandOptions}
        />

        <AutocompleteSelect
            label="Paliwo"
            value=""
            onSelect={() => {}}
            options={["Benzyna", "Diesel", "Elektryczny", "Hybryda"]}
        />
    </div>
};

export default Selsector
