import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  control: any;
  type?: string;
}

export const TextInput = ({ name, label, control, type = 'text' }: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        type={type}
        margin="normal"
        variant="outlined"
        error={!!error}
        helperText={error ? error.message : ''}
      />
    )}
  />
);
