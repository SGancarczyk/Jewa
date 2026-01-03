import { useEffect, useState } from 'react';
import './Selector.css';
import TypeSelector from './TypeSelector/TypeSelector';
import { AutocompleteSelector } from '../../support/AutocompleteSelect/AutocompleteSelect';

export interface SearchCriteria {
    make?: string | null;
    model?: string | null;
    year?: string | null;
    vehicleType?: string | null;
}

interface MakeDTO {
    id: number;
    name: string;
}

interface ModelDTO {
    id: number;
    name: string;
    make_id: number;
}

interface SelectorProps {
    onSearchCriteria: (criteria: SearchCriteria) => void;
}


const mockDatabaseYears: string[] = ["2025", "2024", "2023", "2022", "2020", "2015", "2010"];
const mockDatabasePrices: string[] = ["10000", "50000", "100000", "200000", "500000"];

export const Selsector = ({ onSearchCriteria }: SelectorProps) => {
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrand] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [price, setprice] = useState<string | null>(null);

    const [brandOptions, setBrandOptions] = useState<string[]>([]);
    const [modelOptions, setModelOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vehicles/get_makes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data: MakeDTO[] = await response.json();
                    setBrandOptions(data.map(item => item.name));
                } else {
                    console.error("Błąd pobierania marek");
                }
            } catch (error) {
                console.error("Błąd połączenia z API:", error);
            }
        };

        fetchMakes();
        setBrand(null);
    }, [vehicleType]);

    useEffect(() => {
        if (!brand) {
            setModelOptions([]);
            setModel(null);
            return;
        }

        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vehicles/get_models', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ make: brand })
                });

                if (response.ok) {
                    const data: ModelDTO[] = await response.json();
                    setModelOptions(data.map(item => item.name));
                }
            } catch (error) {
                console.error("Błąd pobierania modeli:", error);
            }
        };

        fetchModels();
        setModel(null);
    }, [brand]);

    return (
        <div className='container'>
            <h1 className='hero-title'>Znajdź idealne auto <strong>dla siebie</strong></h1>
            <div className='search-grid-container'>

                <TypeSelector selected={vehicleType} onSelect={setVehicleType} />

                <div style={{ gridColumn: "1/3", gridRow: "2"}}>
                    <AutocompleteSelector
                        label="Marka pojazdu"
                        options={brandOptions}
                        value={brand}
                        onChange={(newVal) => setBrand(newVal)}
                    />
                </div>

                <div style={{ gridColumn: "3/5", gridRow: "2"}}>
                    <AutocompleteSelector
                        label="Model pojazdu"
                        options={modelOptions}
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
                        placeholder='Od...'
                    />
                </div>

                <div style={{ gridColumn: "2/3", gridRow: "3"}}>
                    <AutocompleteSelector
                        label="Cena do"
                        options={mockDatabasePrices}
                        value={price}
                        onChange={(newVal) => setprice(newVal)}
                        placeholder='Do...'
                    />
                </div>

                <div style={{ gridColumn: "3/4", gridRow: "3"}}>
                    <AutocompleteSelector
                        label="(Paliwo)"
                        options={[]}
                        value={null}
                        onChange={() => {}}
                        placeholder='Wybierz'
                    />
                </div>
                <div style={{ gridColumn: "4/5", gridRow: "3"}}>
                    <AutocompleteSelector
                        label="(Przebieg)"
                        options={[]}
                        value={null}
                        onChange={() => {}}
                        placeholder='Do...'
                    />
                </div>

                <div style={{ gridColumn: "1/3", gridRow: "4"}}>
                    <button className='search-button'
                    onClick={() => onSearchCriteria({ make: brand, model: model, year: null })}
                    >
                        Pokaż Ogłoszenia
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Selsector;