import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import "./AutocompleteSelect.css"
import { useMemo } from 'react';

interface Props {
	options: string[];
	value: string | null;
	onChange: (newValue: string | null) => void;
	label: string;
	placeholder?: string
}

export const AutocompleteSelector = ({ options, value, onChange, label, placeholder = "Wybierz lub wpisz..." }: Props) => {
	return (
		<Autocomplete
			className='car-selector-root'
			disablePortal
			id="combo-box-demo"
			options={options}
			value={value}
			onChange={(event: any, newValue: any) => {
				onChange(newValue);
			}}

			slotProps={{
				paper: { className: 'car-selector-dropdown' }
			}}

			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					placeholder={placeholder}
				/>
			)}
		/>
	);
};

export default AutocompleteSelector


interface ModelDTO {
	id: number;
	name: string;
	make_id: number;
}

interface DTOProps {
	options: ModelDTO[];
	value: number | null;
	onChange: (id: number | null) => void;
	label: string;
	placeholder?: string;
}

export const AutocompleteMakeSelector = (props: DTOProps) => {
	const { options, value, onChange, ...rest } = props;

	const stringOptions = useMemo(() => {
		return options.map((item) => item.name);
	}, [options]);

	const selectedObject = options.find((item) => item.id === value);
	const stringValue = selectedObject ? selectedObject.name : null;

	const handleStringChange = (newStringValue: string | null) => {
		if (newStringValue === null) {
			onChange(null);
		} else {
			const foundObject = options.find((item) => item.name === newStringValue);
			onChange(foundObject ? foundObject.id : null);
		}
	};

	return (
		<AutocompleteSelector
			{...rest}
			options={stringOptions}
			value={stringValue}
			onChange={handleStringChange}
		/>
	);
};
