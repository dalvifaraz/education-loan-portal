import { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { TextInput } from '@educational-loan-portal/components';
import { registerUserV2 } from '@educational-loan-portal/services';
import { login, setUser, showSnackbar, UserState } from '@educational-loan-portal/store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res: UserState = await registerUserV2({ name, email, password, confirmPassword });
      dispatch(setUser(res));
      dispatch(login({ token: '123456', role: 'client' }));
      dispatch(showSnackbar({ message: 'Login successful!', severity: 'success' }));
      navigate('/client/dashboard');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed';
      dispatch(showSnackbar({ message, severity: 'error' }));
    }
  };

  const isDisabled =
    !formData.name ||
    !formData.email ||
    !formData.password ||
    formData.password !== formData.confirmPassword;

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center">
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextInput name="name" label="Full Name" value={formData.name} onChange={handleChange} />
          <TextInput name="email" label="Email" value={formData.email} onChange={handleChange} />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Typography variant="body2" align="center" mt={2}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit" disabled={isDisabled}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};
