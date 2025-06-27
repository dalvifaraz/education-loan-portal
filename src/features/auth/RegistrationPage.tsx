import { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { TextInput } from '@educational-loan-portal/components';
import { registerUser } from '@educational-loan-portal/services';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [errorField, setErrorField] = useState<'name' | 'email' | 'password' | ''>('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField('');
    setErrorMsg('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorField('name');
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      setErrorField('email');
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorField('email');
      return 'Invalid email';
    }
    if (!formData.password.trim()) {
      setErrorField('password');
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      setErrorField('password');
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    try {
      await registerUser({ ...formData, role: 'client' });
      setSuccess(true);
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <TextInput
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errorField === 'name' ? errorMsg : ''}
            autoComplete="new-name"
          />
          <TextInput
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errorField === 'email' ? errorMsg : ''}
            autoComplete="new-email"
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errorField === 'password' ? errorMsg : ''}
            autoComplete="new-password"
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};
