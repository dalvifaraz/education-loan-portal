// @features/auth/RegisterPage.tsx
import { useForm } from 'react-hook-form';
import { Button, Container, Typography, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '@educational-loan-portal/components';
import { registerUser } from '@educational-loan-portal/services';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.string().oneOf(['client']).required(), // We restrict only 'client' can register directly
});

export const RegisterPage = () => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <TextInput name="name" label="Full Name" control={control} />
          <TextInput name="email" label="Email" control={control} />
          <TextInput name="password" label="Password" control={control} type="password" />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};
