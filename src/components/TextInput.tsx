import { TextField } from '@mui/material';

interface Props {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

export const TextInput = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  error,
  autoComplete = 'off',
}: Props) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    margin="normal"
    variant="outlined"
    error={!!error}
    helperText={error}
    autoComplete={autoComplete}
  />
);
