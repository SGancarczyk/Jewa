import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import { useState } from "react";
import "./TextField.css"

interface CustomTextFieldProps {
    minLength?: number;
    maxLength?: number;
    style?: React.CSSProperties;
    label: string;
    placeholder?: string
}

function CustomTextField({ minLength = 16, maxLength = 70, style, label, placeholder }: CustomTextFieldProps) {
  const [title, setTitle] = useState('');

  const isError = title.length > 0 && (title.length < minLength || title.length > maxLength);

  const helperText = isError
    ? title.length < minLength
      ? `Brakuje ${minLength - title.length} znaków`
      : `Przekroczono o ${title.length - maxLength} znaków`
    : `${title.length}/${maxLength}`;

  return (
    <Box >
      <TextField
        className="custom-textfield"
        fullWidth
        label={label}
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={isError}
        helperText={helperText}
        style={style}

        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        }}
      />
    </Box>
  );
}

export default CustomTextField;