import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import "./TextField.css"

interface TextFieldConfig {
	label: string;
	placeholder: string;
	minLength: number;
	maxLength: number;
	value: string;
	onChange: (newValue: string) => void;
	suffix: string;
}

export const useTextField = (
	label: string,
	placeholder: string,
	minLength: number = 0,
	maxLength: number = 100,
	initialValue: string = "",
	suffix: string = ""
): TextFieldConfig => {
	const [value, setValue] = useState(initialValue);
	return {
		label,
		placeholder,
		minLength,
		maxLength,
		value,
		onChange: setValue,
		suffix
	}
}

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
	fieldData: TextFieldConfig;
}

function CustomTextField({
	fieldData,
	sx,
	...props
}: CustomTextFieldProps) {
	const { value, label, placeholder, minLength, maxLength, onChange, suffix } = fieldData;

	const currentLength = value.length;
	const isError = currentLength > 0 && (currentLength < minLength || currentLength > maxLength);

	const computedHelperText = isError
		? currentLength < minLength
			? `Brakuje ${minLength - currentLength} znaków`
			: `Przekroczono o ${currentLength - maxLength} znaków`
		: `${currentLength}/${maxLength}`;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<Box>
			<TextField
				className="custom-textfield"
				fullWidth
				label={label}
				value={value}
				onChange={handleChange}
				error={isError}
				helperText={computedHelperText}
				placeholder={placeholder}
				InputProps={{
					endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : null,
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: '12px',
					},
					...sx as any
				}}
				{...props}
			/>
		</Box>
	);
}

export default CustomTextField;