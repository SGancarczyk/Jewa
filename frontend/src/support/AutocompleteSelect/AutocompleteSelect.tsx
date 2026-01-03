import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import "./AutocompleteSelect.css"

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