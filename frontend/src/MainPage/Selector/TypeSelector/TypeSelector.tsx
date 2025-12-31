import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../Icons/Icon';
import { type IconName } from '../../../Icons/IconsData';
import "./TypeSelector.css"

interface VehicleOption {
    id: string;
    label: string;
    icon: IconName;
}

const options: VehicleOption[] = [
    { id: 'CARS', label: 'osobowe', icon: 'car' },
    { id: 'TRUCKS', label: 'ciężarowe', icon: 'truck' },
    { id: 'CONSTRUCTION', label: 'budowlane', icon: 'construction' },
];

interface Props {
    selected: string;
    onSelect: (id: string) => void;
}

export const TypeSelector = ({selected, onSelect}: Props) => {
    return <div className='vehicle-selector-container'>
        {options.map((option) => (
            <button
                className={`vehicle-btn ${selected === option.id ? 'active' : ''}`}
                key={option.id}
                onClick={() => onSelect(option.id)}
            >
                <Icon name={option.icon} width={31} height={22} />
                <span>{option.label}</span>
            </button>
        ))}
        <div className="ghost-button" />
    </div>
};

export default TypeSelector
