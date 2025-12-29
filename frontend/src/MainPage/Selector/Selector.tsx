import { useEffect, useState } from 'react';
import './Selector.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons/Icon';
import TypeSelector from './TypeSelector/TypeSelector';
import { AutocompleteSelector } from './AutocompleteSelect/AutocompleteSelect';

const mockDatabaseBrands: Record<string, string[]> = {
    personal: ["Audi", "BMW", "Volkswagen", "Toyota", "Opel", "Polonez", "Citroen", "BYD", "Renault", "Nissan"],
    truck: ["Volvo", "Scania", "MAN", "DAF", "Mercedes-Benz Trucks"],
    construction: ["CAT", "JCB", "Komatsu", "Liebherr"]
};

const mockDatabaseModels: Record<string, string[]> = {
    Audi: ["A6", "A8", "Q8", "RS3"],
    Volkswagen: ["Passat", "Polo", "Golf"],
    Toyota: ["Auris", "Avensis", "Corolla"]
};

const mockDatabaseYears: string[] = ["2025", "2024", "2023", "1999"];
const mockDatabasePrices: string[] = ["10000", "500000", "1000000", "4"];

export const Selsector = () => {
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrand] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [price, setprice] = useState<string | null>(null);

    const currentBrandOptions = mockDatabaseBrands[vehicleType] || [];
    const currentModelOptions = brand ? (mockDatabaseModels[brand] || []) : [];

    useEffect(() => {
        setBrand(null);
    }, [vehicleType]);

    useEffect(() => {
        setModel(null);
    }, [brand])

    return <div className='container'>
        <h1 className='hero-title'>Znajdź idealne auto <strong>dla siebie</strong></h1>
        <div className='search-grid-container'>
            <TypeSelector selected={vehicleType} onSelect={setVehicleType} />
            <div style={{ gridColumn: "1/3", gridRow: "2"}}>
                <AutocompleteSelector
                    label="Marka pojazdu"
                    options={currentBrandOptions}
                    value={brand}
                    onChange={(newVal) => {setBrand(newVal)}}
                />
            </div>
            <div style={{ gridColumn: "3/5", gridRow: "2"}}>
                <AutocompleteSelector
                    label="Model pojazdu"
                    options={currentModelOptions}
                    value={model}
                    onChange={(newVal) => setModel(newVal)}

                />
            </div>
            <div style={{ gridColumn: "1/2", gridRow: "3"}}>
                <AutocompleteSelector
                    label="Rok produkcji"
                    options={mockDatabaseYears}
                    value={year}
                    onChange={(newVal) => setYear(newVal)}
                    placeholder='Wybierz...'
                />
            </div>
            <div style={{ gridColumn: "2/3", gridRow: "3"}}>
                <AutocompleteSelector
                    label="Cena do"
                    options={mockDatabasePrices}
                    value={price}
                    onChange={(newVal) => setprice(newVal)}
                    placeholder='Wybierz...'
                />
            </div>
            <div style={{ gridColumn: "3/4", gridRow: "3"}}>
                <AutocompleteSelector
                    label="(W realizacji)"
                    options={[]}
                    value={null}
                    onChange={() => {}}
                    placeholder='NIC NIE MA'
                />
            </div>
            <div style={{ gridColumn: "4/5", gridRow: "3"}}>
                <AutocompleteSelector
                    label="(W realizacji)"
                    options={[]}
                    value={null}
                    onChange={() => {}}
                    placeholder='NIC NIE MA'
                />
            </div>
            <div style={{ gridColumn: "1/3", gridRow: "4"}}>
                <button className='search-button'>Pokaż 1512 Ogłoszeń</button>
            </div>
        </div>
    </div>
};

export default Selsector
