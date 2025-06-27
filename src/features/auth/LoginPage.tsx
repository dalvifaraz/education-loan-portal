import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { loginUser } from '@educational-loan-portal/services';
import { TextInput } from '@educational-loan-portal/components';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const LoginPage = () => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: any) => {
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await loginUser(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      window.location.href = res.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          Education Loan Portal Login
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <TextInput name="email" label="Email" control={control} />
          <TextInput name="password" label="Password" control={control} type="password" />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
